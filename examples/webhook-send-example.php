<?php
/**
 * WEBHOOK SEND EXAMPLE
 * ====================
 * 
 * File ini menunjukkan berbagai cara untuk mengirim data ke N8N webhook
 * 
 * Jalankan dengan:
 *   php examples/webhook-send-example.php
 * 
 * Pastikan N8N sedang berjalan sebelum menjalankan script ini
 */

// Autoload classes (adjust path sesuai struktur project)
require_once __DIR__ . '/../src/services/N8nWebhookService.php';
require_once __DIR__ . '/../src/utils/WebhookPayloadBuilder.php';
require_once __DIR__ . '/../src/config/WebhookConfig.php';

// ============================================================================
// EXAMPLE 1: Simple Direct Send
// ============================================================================
echo "\n=== EXAMPLE 1: Simple Direct Send ===\n";

$service = new N8nWebhookService(
    WebhookConfig::getWebhookUrl(),
    WebhookConfig::getTimeout(),
    debug: true // Enable debug output
);

$payload = [
    'wifiName' => 'WiFi Main Office',
    'phone' => '081234567890',
    'diagnosis' => [
        'id' => 'P01',
        'nama' => 'Bandwidth penuh / overload pengguna',
        'cf' => 0.87,
        'solusi' => 'Kurangi jumlah pengguna yang aktif atau upgrade bandwidth',
        'dispatch' => 'self'
    ],
    'symptoms' => [
        'G01' => 0.8,
        'G03' => 0.6,
        'G08' => 1.0
    ],
    'timestamp' => date('c')
];

$result = $service->sendAnalysisData($payload);

if ($result['success']) {
    echo "✅ Success! Response: " . json_encode($result['data']) . "\n";
} else {
    echo "❌ Failed! Error: " . $result['error'] . "\n";
}

// ============================================================================
// EXAMPLE 2: Using PayloadBuilder (Fluent Interface)
// ============================================================================
echo "\n=== EXAMPLE 2: Using PayloadBuilder (Fluent) ===\n";

try {
    $builder = new WebhookPayloadBuilder();
    $payload = $builder
        ->setWifiName('WiFi Branch Office')
        ->setPhone('082345678901')
        ->setDiagnosis(
            'P02',
            'Gangguan dari ISP',
            0.92,
            'Hubungi ISP untuk escalation',
            'remote'
        )
        ->addSymptom('G06', 0.9)
        ->addSymptom('G04', 0.85)
        ->build();

    echo "Payload created:\n" . $builder->toFormattedString() . "\n";

    $service = new N8nWebhookService(null, 30, true);
    $result = $service->sendAnalysisData($payload);

    if ($result['success']) {
        echo "✅ Success!\n";
    } else {
        echo "❌ Failed! Error: " . $result['error'] . "\n";
    }
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "\n";
}

// ============================================================================
// EXAMPLE 3: Convert from Legacy Format
// ============================================================================
echo "\n=== EXAMPLE 3: Convert from Legacy Format ===\n";

$legacyFormat = [
    'customer' => [
        'name' => 'WiFi Kantor Pusat',
        'phone' => '083456789012'
    ],
    'diagnosis' => 'Access Point rusak',
    'diagnosis_id' => 'P04',
    'cf' => 0.88,
    'diagnosis_solution' => 'Ganti Access Point dengan yang baru',
    'need_technician' => true,
    'dispatch_type' => 'onsite',
    'symptoms' => [
        'G02' => 0.95,
        'G05' => 0.80
    ]
];

try {
    $payload = WebhookPayloadBuilder::convertFromLegacyFormat($legacyFormat);
    echo "Converted payload:\n" . json_encode($payload, JSON_PRETTY_PRINT) . "\n";

    $service = new N8nWebhookService(null, 30, true);
    $result = $service->sendAnalysisData($payload);

    if ($result['success']) {
        echo "✅ Success!\n";
    } else {
        echo "❌ Failed! Error: " . $result['error'] . "\n";
    }
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "\n";
}

// ============================================================================
// EXAMPLE 4: Test Connection
// ============================================================================
echo "\n=== EXAMPLE 4: Test Connection to N8N ===\n";

$service = new N8nWebhookService(null, 10, true);
$result = $service->testConnection();

if ($result['success']) {
    echo "✅ Connected to N8N webhook successfully!\n";
    echo "Response: " . json_encode($result['data']) . "\n";
} else {
    echo "❌ Failed to connect to N8N!\n";
    echo "Error: " . $result['error'] . "\n";
    echo "Make sure N8N is running at: " . $service->getWebhookUrl() . "\n";
}

// ============================================================================
// EXAMPLE 5: Multiple Symptoms
// ============================================================================
echo "\n=== EXAMPLE 5: Multiple Symptoms ===\n";

try {
    $builder = new WebhookPayloadBuilder();
    $builder
        ->setWifiName('WiFi Server Room')
        ->setPhone('084567890123')
        ->setDiagnosis(
            'P09',
            'DNS bermasalah',
            0.75,
            'Clear DNS cache atau ganti DNS server',
            'self'
        )
        // Add multiple symptoms at once
        ->addSymptoms([
            'G04' => 0.8,
            'G10' => 0.7,
            'G32' => 0.85
        ]);

    $payload = $builder->build();
    echo "Payload dengan multiple symptoms:\n" . $builder->toFormattedString() . "\n";

    $service = new N8nWebhookService(null, 30, true);
    $result = $service->sendAnalysisData($payload);

    if ($result['success']) {
        echo "✅ Success!\n";
    } else {
        echo "❌ Failed! Error: " . $result['error'] . "\n";
    }
} catch (Exception $e) {
    echo "❌ Exception: " . $e->getMessage() . "\n";
}

// ============================================================================
// SUMMARY
// ============================================================================
echo "\n=== USAGE SUMMARY ===\n";
echo "1. Simple: \$service->sendAnalysisData(\$payload)\n";
echo "2. Builder: \$builder = new WebhookPayloadBuilder()\n";
echo "3. Legacy: WebhookPayloadBuilder::convertFromLegacyFormat(\$old)\n";
echo "4. Test: \$service->testConnection()\n";
echo "5. Config: WebhookConfig::getAll()\n";
echo "\nFor more info, see WEBHOOK_PHP_INTEGRATION.md\n";
?>
