<?php
/**
 * Webhook Configuration
 * ====================
 * Centralized configuration untuk N8N webhook integration
 * 
 * Load dari:
 * 1. Environment variables (.env file)
 * 2. PHP constants
 * 3. Default values
 */

class WebhookConfig
{
    // Webhook URL
    public static function getWebhookUrl()
    {
        return getenv('N8N_WEBHOOK_URL') ?: 'http://localhost:5678/webhook-test/netreport';
    }

    // Timeout in seconds
    public static function getTimeout()
    {
        return (int)(getenv('N8N_WEBHOOK_TIMEOUT') ?: 30);
    }

    // Enable debug mode
    public static function isDebugEnabled()
    {
        return filter_var(getenv('N8N_WEBHOOK_DEBUG') ?? false, FILTER_VALIDATE_BOOLEAN);
    }

    // Enable logging to file
    public static function isFileLoggingEnabled()
    {
        return filter_var(getenv('N8N_WEBHOOK_LOG_TO_FILE') ?? false, FILTER_VALIDATE_BOOLEAN);
    }

    // Log file path
    public static function getLogFilePath()
    {
        return getenv('N8N_WEBHOOK_LOG_PATH') ?: __DIR__ . '/../../logs/webhook.log';
    }

    // Retry configuration
    public static function getRetryConfig()
    {
        return [
            'enabled' => filter_var(getenv('N8N_WEBHOOK_RETRY') ?? true, FILTER_VALIDATE_BOOLEAN),
            'maxAttempts' => (int)(getenv('N8N_WEBHOOK_MAX_RETRIES') ?: 3),
            'delayMs' => (int)(getenv('N8N_WEBHOOK_RETRY_DELAY') ?: 1000),
        ];
    }

    // Validate required fields
    public static function getValidationRules()
    {
        return [
            'wifiName' => ['required', 'string', 'min:1'],
            'phone' => ['required', 'string', 'min:7'],
            'diagnosis.id' => ['required', 'string'],
            'diagnosis.nama' => ['required', 'string', 'min:3'],
            'diagnosis.cf' => ['required', 'numeric', 'min:0', 'max:1'],
            'diagnosis.solusi' => ['required', 'string'],
            'diagnosis.dispatch' => ['required', 'in:self,remote,onsite'],
        ];
    }

    // Get all config as array
    public static function getAll()
    {
        return [
            'webhook_url' => self::getWebhookUrl(),
            'timeout' => self::getTimeout(),
            'debug' => self::isDebugEnabled(),
            'file_logging' => self::isFileLoggingEnabled(),
            'log_path' => self::getLogFilePath(),
            'retry' => self::getRetryConfig(),
        ];
    }

    // Print config info
    public static function displayConfig()
    {
        echo "=== N8N Webhook Configuration ===\n";
        echo "URL: " . self::getWebhookUrl() . "\n";
        echo "Timeout: " . self::getTimeout() . "s\n";
        echo "Debug: " . (self::isDebugEnabled() ? 'ON' : 'OFF') . "\n";
        echo "File Logging: " . (self::isFileLoggingEnabled() ? 'ON' : 'OFF') . "\n";
        echo "Retry: " . (self::getRetryConfig()['enabled'] ? 'ON' : 'OFF') . "\n";
        echo "===================================\n";
    }
}
?>
