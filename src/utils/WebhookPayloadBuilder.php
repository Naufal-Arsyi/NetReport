<?php
/**
 * Webhook Payload Builder
 * ======================
 * Helper class untuk build dan validate webhook payload
 * 
 * Gunakan class ini untuk convert dari berbagai format data ke standard payload
 * 
 * Usage:
 *   $builder = new WebhookPayloadBuilder();
 *   $payload = $builder
 *       ->setWifiName('WiFi Main Office')
 *       ->setPhone('081234567890')
 *       ->setDiagnosis('P01', 'Bandwidth penuh', 0.87, 'Kurangi pengguna', 'self')
 *       ->addSymptom('G01', 0.8)
 *       ->addSymptom('G03', 0.6)
 *       ->build();
 */

class WebhookPayloadBuilder
{
    private $wifiName;
    private $phone;
    private $diagnosis = [];
    private $symptoms = [];
    private $timestamp;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->timestamp = date('c'); // ISO 8601 format
    }

    /**
     * Set WiFi name
     */
    public function setWifiName($name)
    {
        $this->wifiName = (string) $name;
        return $this;
    }

    /**
     * Set phone number
     */
    public function setPhone($phone)
    {
        $this->phone = (string) $phone;
        return $this;
    }

    /**
     * Set diagnosis
     * 
     * @param string $id - Diagnosis ID (e.g., 'P01')
     * @param string $nama - Diagnosis name
     * @param float $cf - Certainty Factor (0-1)
     * @param string $solusi - Solution/recommendation
     * @param string $dispatch - Type (self|remote|onsite)
     */
    public function setDiagnosis($id, $nama, $cf, $solusi, $dispatch)
    {
        // Validate CF
        if ($cf < 0 || $cf > 1) {
            throw new Exception("CF must be between 0 and 1, got: $cf");
        }

        // Validate dispatch
        $validDispatch = ['self', 'remote', 'onsite'];
        if (!in_array($dispatch, $validDispatch)) {
            throw new Exception("Invalid dispatch value: $dispatch. Must be one of: " . implode(', ', $validDispatch));
        }

        $this->diagnosis = [
            'id' => (string) $id,
            'nama' => (string) $nama,
            'cf' => (float) $cf,
            'solusi' => (string) $solusi,
            'dispatch' => (string) $dispatch
        ];

        return $this;
    }

    /**
     * Add symptom
     * 
     * @param string $symptomId - Symptom ID (e.g., 'G01')
     * @param float $confidence - Confidence value (0-1)
     */
    public function addSymptom($symptomId, $confidence)
    {
        // Validate confidence
        if ($confidence < 0 || $confidence > 1) {
            throw new Exception("Confidence must be between 0 and 1 for symptom $symptomId");
        }

        $this->symptoms[(string) $symptomId] = (float) $confidence;
        return $this;
    }

    /**
     * Add multiple symptoms at once
     * 
     * @param array $symptoms - Format: ['G01' => 0.8, 'G03' => 0.6]
     */
    public function addSymptoms($symptoms)
    {
        if (!is_array($symptoms)) {
            throw new Exception("Symptoms must be an array");
        }

        foreach ($symptoms as $id => $confidence) {
            $this->addSymptom($id, $confidence);
        }

        return $this;
    }

    /**
     * Set custom timestamp
     */
    public function setTimestamp($timestamp)
    {
        $this->timestamp = (string) $timestamp;
        return $this;
    }

    /**
     * Build the final payload
     */
    public function build()
    {
        // Validate required fields
        if (empty($this->wifiName)) {
            throw new Exception("WiFi name is required");
        }

        if (empty($this->phone)) {
            throw new Exception("Phone number is required");
        }

        if (empty($this->diagnosis)) {
            throw new Exception("Diagnosis is required");
        }

        return [
            'wifiName' => $this->wifiName,
            'phone' => $this->phone,
            'diagnosis' => $this->diagnosis,
            'symptoms' => $this->symptoms,
            'timestamp' => $this->timestamp
        ];
    }

    /**
     * Build and validate
     */
    public function buildAndValidate()
    {
        $payload = $this->build();
        $this->validate($payload);
        return $payload;
    }

    /**
     * Validate payload structure
     */
    public static function validate($payload)
    {
        if (!is_array($payload)) {
            throw new Exception("Payload must be an array");
        }

        // Check required fields
        $required = ['wifiName', 'phone', 'diagnosis', 'symptoms', 'timestamp'];
        foreach ($required as $field) {
            if (!isset($payload[$field])) {
                throw new Exception("Missing required field: $field");
            }
        }

        // Validate diagnosis
        $diagnosis = $payload['diagnosis'];
        if (!is_array($diagnosis)) {
            throw new Exception("Diagnosis must be an array");
        }

        $diagnosisRequired = ['id', 'nama', 'cf', 'solusi', 'dispatch'];
        foreach ($diagnosisRequired as $field) {
            if (!isset($diagnosis[$field])) {
                throw new Exception("Missing diagnosis field: $field");
            }
        }

        // Validate CF
        if ($diagnosis['cf'] < 0 || $diagnosis['cf'] > 1) {
            throw new Exception("CF must be between 0 and 1");
        }

        // Validate dispatch
        $validDispatch = ['self', 'remote', 'onsite'];
        if (!in_array($diagnosis['dispatch'], $validDispatch)) {
            throw new Exception("Invalid dispatch value: " . $diagnosis['dispatch']);
        }

        // Validate symptoms
        if (!is_array($payload['symptoms'])) {
            throw new Exception("Symptoms must be an array");
        }

        foreach ($payload['symptoms'] as $symptomId => $confidence) {
            if ($confidence < 0 || $confidence > 1) {
                throw new Exception("Symptom $symptomId confidence must be between 0 and 1");
            }
        }

        return true;
    }

    /**
     * Convert from old PHP format to new standard format
     * 
     * @param array $oldFormat - Old format: ['customer' => [...], 'diagnosis' => '...', 'cf' => 0.8, ...]
     * @return array - Standard format
     */
    public static function convertFromLegacyFormat($oldFormat)
    {
        if (!isset($oldFormat['customer']) || !isset($oldFormat['diagnosis'])) {
            throw new Exception("Missing customer or diagnosis in legacy format");
        }

        $customer = $oldFormat['customer'];
        $needTechnician = isset($oldFormat['need_technician']) ? $oldFormat['need_technician'] : false;

        // Determine dispatch based on need_technician
        $dispatch = 'self'; // Default
        if ($needTechnician) {
            // Could be 'remote' or 'onsite' depending on context
            // For now, default to 'remote'
            $dispatch = isset($oldFormat['dispatch_type']) ? $oldFormat['dispatch_type'] : 'remote';
        }

        $builder = new self();
        $builder
            ->setWifiName($customer['name'] ?? 'Unknown')
            ->setPhone($customer['phone'] ?? '')
            ->setDiagnosis(
                $oldFormat['diagnosis_id'] ?? 'UNKNOWN',
                $oldFormat['diagnosis'] ?? '',
                $oldFormat['cf'] ?? 0.5,
                $oldFormat['diagnosis_solution'] ?? '',
                $dispatch
            );

        // Add symptoms if available
        if (isset($oldFormat['symptoms']) && is_array($oldFormat['symptoms'])) {
            $builder->addSymptoms($oldFormat['symptoms']);
        }

        // Custom timestamp if available
        if (isset($oldFormat['timestamp'])) {
            $builder->setTimestamp($oldFormat['timestamp']);
        }

        return $builder->build();
    }

    /**
     * Export as JSON
     */
    public function toJson()
    {
        return json_encode($this->build(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Export as pretty JSON (for logging)
     */
    public function toFormattedString()
    {
        return $this->toJson();
    }
}
?>
