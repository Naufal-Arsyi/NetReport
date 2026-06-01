<?php
/**
 * N8N Webhook Service
 * ==================
 * Service untuk mengirim data hasil analisis WiFi ke webhook N8N
 * 
 * Usage:
 *   $service = new N8nWebhookService();
 *   $response = $service->sendAnalysisData($payload);
 *   if ($response['success']) {
 *       echo "Data berhasil dikirim ke N8N";
 *   }
 */

class N8nWebhookService
{
    private $webhookUrl;
    private $timeout;
    private $debug;
    private $lastError;
    private $lastResponse;

    /**
     * Constructor
     * 
     * @param string $webhookUrl - URL webhook N8N (optional, ambil dari config)
     * @param int $timeout - Timeout in seconds (default: 30)
     * @param bool $debug - Enable debug logging (default: false)
     */
    public function __construct($webhookUrl = null, $timeout = 30, $debug = false)
    {
        $this->webhookUrl = $webhookUrl ?? getenv('N8N_WEBHOOK_URL') ?? 'http://localhost:5678/webhook-test/netreport';
        $this->timeout = $timeout;
        $this->debug = $debug;
        $this->lastError = null;
        $this->lastResponse = null;
    }

    /**
     * Kirim data analisis ke N8N webhook
     * 
     * @param array $payload - Data payload (wifiName, phone, diagnosis, symptoms, timestamp)
     * @return array - ['success' => bool, 'data' => response, 'error' => error_message]
     */
    public function sendAnalysisData($payload)
    {
        // Validate payload structure
        if (!$this->isValidPayload($payload)) {
            $this->lastError = "Invalid payload structure";
            return [
                'success' => false,
                'error' => $this->lastError,
                'data' => null
            ];
        }

        try {
            $this->log("📤 Mengirim data ke webhook N8N: " . $this->webhookUrl);
            $this->log("📦 Payload: " . json_encode($payload, JSON_PRETTY_PRINT));

            // Initialize cURL
            $ch = curl_init($this->webhookUrl);

            // Set cURL options
            $this->configureCurl($ch, $payload);

            // Execute request
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $error = curl_error($ch);

            curl_close($ch);

            // Handle errors
            if ($error) {
                $this->lastError = $error;
                $this->log("❌ cURL Error: " . $error);
                return [
                    'success' => false,
                    'error' => "cURL Error: " . $error,
                    'data' => null
                ];
            }

            // Handle HTTP errors
            if ($httpCode < 200 || $httpCode >= 300) {
                $this->lastError = "HTTP $httpCode";
                $this->log("❌ HTTP Error: $httpCode");
                return [
                    'success' => false,
                    'error' => "HTTP Error: $httpCode",
                    'data' => $response
                ];
            }

            // Decode response
            $responseData = json_decode($response, true);

            $this->lastResponse = $responseData;
            $this->log("✅ Data berhasil dikirim ke N8N");
            $this->log("✅ Response: " . json_encode($responseData, JSON_PRETTY_PRINT));

            return [
                'success' => true,
                'error' => null,
                'data' => $responseData
            ];
        } catch (Exception $e) {
            $this->lastError = $e->getMessage();
            $this->log("❌ Exception: " . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => null
            ];
        }
    }

    /**
     * Configure cURL options
     */
    private function configureCurl($ch, $payload)
    {
        $postFields = json_encode($payload);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);

        // Headers
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($postFields),
            'User-Agent: N8nWebhookClient/1.0'
        ]);

        // Development: skip SSL verification (NOT for production!)
        // Uncomment if using HTTPS dan need to skip verification
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    }

    /**
     * Validate payload structure
     */
    private function isValidPayload($payload)
    {
        if (!is_array($payload)) {
            return false;
        }

        // Required fields
        $required = ['wifiName', 'phone', 'diagnosis', 'symptoms', 'timestamp'];
        foreach ($required as $field) {
            if (!isset($payload[$field])) {
                $this->log("❌ Missing required field: $field");
                return false;
            }
        }

        // Diagnosis structure validation
        if (!isset($payload['diagnosis']['id']) ||
            !isset($payload['diagnosis']['nama']) ||
            !isset($payload['diagnosis']['cf']) ||
            !isset($payload['diagnosis']['dispatch'])) {
            $this->log("❌ Invalid diagnosis structure");
            return false;
        }

        // CF range validation (0-1)
        if ($payload['diagnosis']['cf'] < 0 || $payload['diagnosis']['cf'] > 1) {
            $this->log("❌ CF must be between 0 and 1");
            return false;
        }

        // Dispatch enum validation
        $validDispatch = ['self', 'remote', 'onsite'];
        if (!in_array($payload['diagnosis']['dispatch'], $validDispatch)) {
            $this->log("❌ Invalid dispatch value: " . $payload['diagnosis']['dispatch']);
            return false;
        }

        return true;
    }

    /**
     * Logging helper
     */
    private function log($message)
    {
        if ($this->debug) {
            echo "[N8N Webhook] " . $message . "\n";
        }

        // Optionally log to file
        // error_log($message, 3, __DIR__ . '/logs/webhook.log');
    }

    /**
     * Get last error
     */
    public function getLastError()
    {
        return $this->lastError;
    }

    /**
     * Get last response
     */
    public function getLastResponse()
    {
        return $this->lastResponse;
    }

    /**
     * Set webhook URL (for testing or override)
     */
    public function setWebhookUrl($url)
    {
        $this->webhookUrl = $url;
    }

    /**
     * Get current webhook URL
     */
    public function getWebhookUrl()
    {
        return $this->webhookUrl;
    }

    /**
     * Enable/disable debug mode
     */
    public function setDebug($debug)
    {
        $this->debug = $debug;
    }

    /**
     * Test connection to webhook (send ping)
     */
    public function testConnection()
    {
        $testPayload = [
            'wifiName' => 'Test WiFi',
            'phone' => '081234567890',
            'diagnosis' => [
                'id' => 'TEST',
                'nama' => 'Test Connection',
                'cf' => 0.5,
                'solusi' => 'This is a test message',
                'dispatch' => 'self'
            ],
            'symptoms' => [],
            'timestamp' => date('c')
        ];

        return $this->sendAnalysisData($testPayload);
    }
}
?>
