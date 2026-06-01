# N8N Webhook Integration - PHP Documentation

## Overview

Dokumentasi lengkap untuk mengintegrasikan PHP application dengan N8N webhook untuk mengirim data WiFi troubleshooting analysis.

---

## 📁 File Structure

```
wifi_troubleshoot/
├── src/
│   ├── services/
│   │   └── N8nWebhookService.php         # Main webhook service (cURL)
│   ├── utils/
│   │   └── WebhookPayloadBuilder.php     # Payload builder & converter
│   └── config/
│       └── WebhookConfig.php             # Centralized configuration
├── examples/
│   └── webhook-send-example.php          # Usage examples
├── .env.example                          # Environment template
└── WEBHOOK_PHP_INTEGRATION.md            # This file
```

---

## 🚀 Quick Start

### 1. Setup Environment

Buat file `.env.local` di root project:

```env
N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/netreport
N8N_WEBHOOK_TIMEOUT=30
N8N_WEBHOOK_DEBUG=true
N8N_WEBHOOK_LOG_TO_FILE=false
```

### 2. Load Classes

```php
require_once __DIR__ . '/src/services/N8nWebhookService.php';
require_once __DIR__ . '/src/utils/WebhookPayloadBuilder.php';
require_once __DIR__ . '/src/config/WebhookConfig.php';
```

### 3. Send Data

```php
// Method 1: Using PayloadBuilder (Recommended)
$builder = new WebhookPayloadBuilder();
$payload = $builder
    ->setWifiName('WiFi Main Office')
    ->setPhone('081234567890')
    ->setDiagnosis('P01', 'Bandwidth overload', 0.87, 'Reduce users', 'self')
    ->addSymptom('G01', 0.8)
    ->addSymptom('G03', 0.6)
    ->build();

// Method 2: Send using service
$service = new N8nWebhookService();
$result = $service->sendAnalysisData($payload);

if ($result['success']) {
    echo "Data sent successfully!";
    echo "Response: " . json_encode($result['data']);
} else {
    echo "Failed: " . $result['error'];
}
```

---

## 📋 API Reference

### N8nWebhookService

Main service untuk mengirim data ke webhook.

#### Constructor

```php
$service = new N8nWebhookService(
    $webhookUrl = null,    // Ambil dari env jika null
    $timeout = 30,         // Timeout in seconds
    $debug = false         // Enable debug logging
);
```

#### Methods

##### sendAnalysisData($payload)

Kirim data analisis ke webhook.

```php
$result = $service->sendAnalysisData($payload);

// Returns:
// [
//     'success' => true|false,
//     'error' => null|string,
//     'data' => response|null
// ]
```

**Example:**
```php
$payload = [
    'wifiName' => 'WiFi Main Office',
    'phone' => '081234567890',
    'diagnosis' => [
        'id' => 'P01',
        'nama' => 'Bandwidth penuh',
        'cf' => 0.87,
        'solusi' => 'Reduce users',
        'dispatch' => 'self'
    ],
    'symptoms' => ['G01' => 0.8],
    'timestamp' => date('c')
];

$result = $service->sendAnalysisData($payload);
```

##### testConnection()

Test koneksi ke webhook.

```php
$result = $service->testConnection();

if ($result['success']) {
    echo "Connected to N8N!";
}
```

##### setWebhookUrl($url)

Set webhook URL (for override/testing).

```php
$service->setWebhookUrl('http://custom-url:5678/webhook');
```

##### getLastError() / getLastResponse()

Get last error atau response.

```php
$error = $service->getLastError();
$response = $service->getLastResponse();
```

##### setDebug($debug)

Enable/disable debug mode.

```php
$service->setDebug(true);
```

---

### WebhookPayloadBuilder

Helper class untuk build payload dengan validation.

#### Fluent Interface

```php
$builder = new WebhookPayloadBuilder();
$payload = $builder
    ->setWifiName($name)
    ->setPhone($phone)
    ->setDiagnosis($id, $nama, $cf, $solusi, $dispatch)
    ->addSymptom($symptomId, $confidence)
    ->addSymptoms($symptomsArray)
    ->setTimestamp($timestamp)
    ->build();
```

#### Methods

##### setWifiName($name)

Set WiFi name (required).

```php
$builder->setWifiName('WiFi Main Office');
```

##### setPhone($phone)

Set phone number (required).

```php
$builder->setPhone('081234567890');
```

##### setDiagnosis($id, $nama, $cf, $solusi, $dispatch)

Set diagnosis (required).

```php
$builder->setDiagnosis(
    'P01',                              // ID
    'Bandwidth penuh / overload',       // Name
    0.87,                               // CF (0-1)
    'Kurangi pengguna aktif',          // Solution
    'self'                              // dispatch: self|remote|onsite
);
```

##### addSymptom($id, $confidence)

Add single symptom.

```php
$builder->addSymptom('G01', 0.8);
```

##### addSymptoms($array)

Add multiple symptoms.

```php
$builder->addSymptoms([
    'G01' => 0.8,
    'G03' => 0.6,
    'G08' => 1.0
]);
```

##### setTimestamp($timestamp)

Set custom timestamp (ISO 8601).

```php
$builder->setTimestamp(date('c'));
```

##### build()

Build final payload (with validation).

```php
$payload = $builder->build();
// Throws Exception if invalid
```

##### toJson()

Export as JSON string.

```php
$json = $builder->toJson();
echo $json;
```

#### Static Methods

##### WebhookPayloadBuilder::validate($payload)

Validate payload structure.

```php
try {
    WebhookPayloadBuilder::validate($payload);
} catch (Exception $e) {
    echo "Invalid payload: " . $e->getMessage();
}
```

##### WebhookPayloadBuilder::convertFromLegacyFormat($oldFormat)

Convert from old PHP format ke standard format.

```php
$oldFormat = [
    'customer' => ['name' => '...', 'phone' => '...'],
    'diagnosis' => 'Problem name',
    'cf' => 0.8,
    'need_technician' => true
];

$payload = WebhookPayloadBuilder::convertFromLegacyFormat($oldFormat);
```

---

### WebhookConfig

Centralized configuration management.

#### Static Methods

```php
// Get webhook URL
$url = WebhookConfig::getWebhookUrl();

// Get timeout
$timeout = WebhookConfig::getTimeout();

// Check if debug enabled
$debug = WebhookConfig::isDebugEnabled();

// Get retry config
$retry = WebhookConfig::getRetryConfig();

// Get all config
$all = WebhookConfig::getAll();

// Display config
WebhookConfig::displayConfig();
```

#### Configuration Sources (Priority Order)

1. **Environment Variables (.env)**
   ```env
   N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/netreport
   N8N_WEBHOOK_TIMEOUT=30
   N8N_WEBHOOK_DEBUG=true
   N8N_WEBHOOK_LOG_TO_FILE=false
   N8N_WEBHOOK_LOG_PATH=/path/to/logs
   N8N_WEBHOOK_RETRY=true
   N8N_WEBHOOK_MAX_RETRIES=3
   N8N_WEBHOOK_RETRY_DELAY=1000
   ```

2. **Constants (if defined)**

3. **Default Values**

---

## 📊 Payload Structure

### Standard Payload Format

```json
{
  "wifiName": "WiFi Main Office",
  "phone": "081234567890",
  "diagnosis": {
    "id": "P01",
    "nama": "Bandwidth penuh / overload pengguna",
    "cf": 0.87,
    "solusi": "Kurangi jumlah pengguna yang aktif atau upgrade bandwidth",
    "dispatch": "self"
  },
  "symptoms": {
    "G01": 0.8,
    "G03": 0.6,
    "G08": 1.0
  },
  "timestamp": "2026-06-01T10:30:45+00:00"
}
```

### Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `wifiName` | string | ✓ | Nama WiFi |
| `phone` | string | ✓ | Nomor telepon (WhatsApp) |
| `diagnosis.id` | string | ✓ | ID penyebab (e.g., 'P01') |
| `diagnosis.nama` | string | ✓ | Nama penyebab |
| `diagnosis.cf` | float | ✓ | Certainty Factor (0-1) |
| `diagnosis.solusi` | string | ✓ | Solusi yang direkomendasikan |
| `diagnosis.dispatch` | enum | ✓ | self\|remote\|onsite |
| `symptoms` | object | ✗ | Gejala yang dipilih {id: confidence} |
| `timestamp` | string | ✓ | ISO 8601 datetime |

---

## 🔄 Usage Examples

### Example 1: Simple Webhook Send

```php
<?php
require_once 'src/services/N8nWebhookService.php';

$service = new N8nWebhookService('http://localhost:5678/webhook-test/netreport', 30, true);

$payload = [
    'wifiName' => 'WiFi Main Office',
    'phone' => '081234567890',
    'diagnosis' => [
        'id' => 'P01',
        'nama' => 'Bandwidth penuh',
        'cf' => 0.87,
        'solusi' => 'Reduce active users',
        'dispatch' => 'self'
    ],
    'symptoms' => ['G01' => 0.8, 'G03' => 0.6],
    'timestamp' => date('c')
];

$result = $service->sendAnalysisData($payload);

if ($result['success']) {
    echo "✅ Success!";
} else {
    echo "❌ Error: " . $result['error'];
}
?>
```

### Example 2: Using PayloadBuilder

```php
<?php
require_once 'src/utils/WebhookPayloadBuilder.php';
require_once 'src/services/N8nWebhookService.php';

try {
    $builder = new WebhookPayloadBuilder();
    $payload = $builder
        ->setWifiName('WiFi Office')
        ->setPhone('081234567890')
        ->setDiagnosis('P01', 'Bandwidth overload', 0.87, 'Reduce users', 'self')
        ->addSymptoms(['G01' => 0.8, 'G03' => 0.6])
        ->build();

    $service = new N8nWebhookService();
    $result = $service->sendAnalysisData($payload);

    echo $result['success'] ? "✅ Success!" : "❌ " . $result['error'];
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
```

### Example 3: Convert from Legacy Format

```php
<?php
require_once 'src/utils/WebhookPayloadBuilder.php';

$oldData = [
    'customer' => ['name' => 'WiFi Main', 'phone' => '081234567890'],
    'diagnosis' => 'Bandwidth overload',
    'cf' => 0.87,
    'diagnosis_solution' => 'Reduce users',
    'need_technician' => false
];

try {
    $payload = WebhookPayloadBuilder::convertFromLegacyFormat($oldData);
    // Now use with service...
} catch (Exception $e) {
    echo "Conversion error: " . $e->getMessage();
}
?>
```

### Example 4: Batch Send Multiple Reports

```php
<?php
require_once 'src/services/N8nWebhookService.php';
require_once 'src/utils/WebhookPayloadBuilder.php';

$reports = [
    [
        'wifiName' => 'Office 1',
        'phone' => '081111111111',
        'diagnosis' => ['id' => 'P01', 'nama' => 'Bandwidth', 'cf' => 0.8, 'solusi' => '...', 'dispatch' => 'self']
    ],
    [
        'wifiName' => 'Office 2',
        'phone' => '082222222222',
        'diagnosis' => ['id' => 'P02', 'nama' => 'ISP Issue', 'cf' => 0.9, 'solusi' => '...', 'dispatch' => 'remote']
    ]
];

$service = new N8nWebhookService();
$results = [];

foreach ($reports as $report) {
    $result = $service->sendAnalysisData($report);
    $results[] = [
        'wifi' => $report['wifiName'],
        'success' => $result['success']
    ];
}

echo json_encode($results, JSON_PRETTY_PRINT);
?>
```

---

## ❌ Error Handling

### Common Errors

#### 1. Connection Refused
```
cURL Error: Connection refused

Solution:
- Pastikan N8N running di http://localhost:5678
- Check N8N URL di .env
```

#### 2. Invalid Payload
```
Exception: CF must be between 0 and 1

Solution:
- Validate CF value (0-1)
- Check WebhookPayloadBuilder::validate()
```

#### 3. Invalid Dispatch
```
Exception: Invalid dispatch value

Solution:
- Gunakan: self, remote, atau onsite
- Check diagnosis.dispatch value
```

#### 4. Missing Required Fields
```
Exception: Missing required field: wifiName

Solution:
- Set semua required fields sebelum build()
- Check field names (case-sensitive)
```

#### 5. Timeout
```
cURL Error: Operation timed out

Solution:
- Increase timeout di config
- Check network connectivity
```

### Error Response Structure

```php
$result = $service->sendAnalysisData($payload);

// Error case:
[
    'success' => false,
    'error' => 'Error message',
    'data' => null
]

// Success case:
[
    'success' => true,
    'error' => null,
    'data' => [...]  // Response from N8N
]
```

---

## 🧪 Testing

### Test Connection

```php
$service = new N8nWebhookService();
$result = $service->testConnection();

if ($result['success']) {
    echo "✅ N8N webhook accessible!";
} else {
    echo "❌ Cannot connect to N8N: " . $result['error'];
}
```

### Run Example Script

```bash
# Dari root project directory
php examples/webhook-send-example.php
```

### Manual cURL Test

```bash
curl -X POST http://localhost:5678/webhook-test/netreport \
  -H "Content-Type: application/json" \
  -d '{
    "wifiName": "Test WiFi",
    "phone": "081234567890",
    "diagnosis": {
      "id": "P01",
      "nama": "Test",
      "cf": 0.5,
      "solusi": "Test solution",
      "dispatch": "self"
    },
    "symptoms": {},
    "timestamp": "2026-06-01T10:30:00Z"
  }'
```

---

## 📝 Integration Checklist

- [ ] N8N installed dan running di localhost:5678
- [ ] Webhook created di N8N dengan path: `/webhook-test/netreport`
- [ ] PHP classes copied ke src/ folder
- [ ] .env.local created dengan webhook URL
- [ ] Test connection successful
- [ ] Example script runs without errors
- [ ] Payload structure validated
- [ ] Error handling implemented
- [ ] Logging configured (optional)
- [ ] Ready for production deployment

---

## 🔐 Security Considerations

### For Development

```env
N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/netreport
N8N_WEBHOOK_DEBUG=true
```

### For Production

```env
N8N_WEBHOOK_URL=https://secure-n8n.example.com/webhook/netreport
N8N_WEBHOOK_DEBUG=false
N8N_WEBHOOK_TIMEOUT=30
N8N_WEBHOOK_LOG_TO_FILE=true

# If using HTTPS with self-signed cert
# CURL_VERIFY_SSL=false  # NOT recommended for production
```

### Security Best Practices

1. **Use HTTPS** for production webhook URLs
2. **Validate** all input data before sending
3. **Log** webhook calls for audit trail
4. **Rate limit** webhook calls to prevent abuse
5. **Use authentication tokens** if N8N requires
6. **Monitor** webhook failures and retry appropriately

---

## 📚 Additional Resources

- [N8N Documentation](https://docs.n8n.io)
- [N8N Webhook Guide](https://docs.n8n.io/workflows/triggers/webhook/)
- [PHP cURL Documentation](https://www.php.net/manual/en/book.curl.php)
- [JSON Schema Validation](https://json-schema.org/)

---

## 🤝 Support & Troubleshooting

### Check Logs

```php
$service = new N8nWebhookService(null, 30, true); // Enable debug
$result = $service->sendAnalysisData($payload);

// Debug output will be printed
// Last error accessible via:
echo $service->getLastError();
```

### Display Configuration

```php
WebhookConfig::displayConfig();
```

### Validate Payload

```php
try {
    WebhookPayloadBuilder::validate($payload);
    echo "✅ Payload is valid";
} catch (Exception $e) {
    echo "❌ Invalid payload: " . $e->getMessage();
}
```

---

*Last Updated: June 2026*
*Version: 1.0*
