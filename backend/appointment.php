<?php
/**
 * Wilma Construction - Appointment API Endpoint
 *
 * Main entry point for processing appointment requests submitted from the frontend form.
 *
 * Responsibilities:
 * - Security filters (Method check, CORS headers, Request size limit, Rate limit, Honeypot)
 * - Parse and validate JSON input
 * - Delegate processing to AppointmentController
 * - Return standardized JSON responses with proper HTTP status codes
 */

// Define application initialization constant to allow included files to execute
define('APP_INIT', true);

// Enable error logging, but NEVER display errors directly to visitors in production
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// Load JSON response helper
require_once __DIR__ . '/helpers/response.php';

// -------------------------------------------------------------
// 1. CORS & Security Headers
// -------------------------------------------------------------
// Allow pre-flight and cross-origin requests for local testing / decoupled frontend
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');
header('Access-Control-Max-Age: 86400');

// Handle pre-flight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// -------------------------------------------------------------
// 2. HTTP Method Validation (POST Only)
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendErrorResponse(405, 'Method Not Allowed. Only POST requests are accepted.');
}

// -------------------------------------------------------------
// 3. Request Size Limit Protection
// -------------------------------------------------------------
// Reject any request exceeding 64KB to prevent memory exhaustion / DoS attacks
$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 65536) { // 64 KB limit
    sendErrorResponse(413, 'Payload Too Large. Maximum allowed size is 64KB.');
}

// -------------------------------------------------------------
// 4. Basic Rate Limiting (Spam Flood Prevention)
// -------------------------------------------------------------
// Limit submissions per IP: maximum 5 requests per 10 minutes without requiring a database
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rateLimitKey = 'wilma_rate_' . md5($clientIp);
$rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . $rateLimitKey . '.json';

$maxRequests = 5;
$windowSeconds = 600; // 10 minutes
$currentTime = time();
$requests = [];

if (file_exists($rateLimitFile)) {
    $rawRateData = @file_get_contents($rateLimitFile);
    if ($rawRateData !== false) {
        $decoded = @json_decode($rawRateData, true);
        if (is_array($decoded)) {
            // Keep timestamps within the active time window
            $requests = array_filter($decoded, fn($ts) => ($currentTime - $ts) < $windowSeconds);
        }
    }
}

if (count($requests) >= $maxRequests) {
    sendErrorResponse(429, 'Too many requests. Please wait a few minutes before submitting again.');
}

// -------------------------------------------------------------
// 5. Read & Parse JSON Request Body
// -------------------------------------------------------------
$rawInput = file_get_contents('php://input');

if (empty($rawInput)) {
    sendErrorResponse(400, 'Empty request body. Please submit your appointment details.');
}

$requestData = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($requestData)) {
    sendErrorResponse(400, 'Invalid JSON payload. Please verify your submitted data format.');
}

// -------------------------------------------------------------
// 6. Honeypot Spam Protection
// -------------------------------------------------------------
// If any hidden honeypot field is filled, silently discard the spam request
$honeypotFields = ['_hp_website', 'website', 'url', 'honeypot'];
foreach ($honeypotFields as $hpField) {
    if (!empty($requestData[$hpField])) {
        // Pretend it succeeded so the spam bot believes its submission was accepted
        sendSuccessResponse('Your appointment request has been submitted successfully.');
    }
}

// -------------------------------------------------------------
// 7. Load Dependencies & Mail Configuration
// -------------------------------------------------------------
$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    error_log('Wilma Backend Error: Composer dependencies missing. Run "composer install" in backend directory.');
    sendErrorResponse(500, 'Unable to submit your appointment request. Server configuration issue.');
}
require_once $autoloadPath;

$mailConfigFile = __DIR__ . '/config/mail.php';
if (!file_exists($mailConfigFile)) {
    error_log('Wilma Backend Error: Mail configuration file config/mail.php is missing.');
    sendErrorResponse(500, 'Unable to submit your appointment request. Server configuration issue.');
}
$mailConfig = require $mailConfigFile;

require_once __DIR__ . '/controllers/AppointmentController.php';

// -------------------------------------------------------------
// 8. Process Appointment via AppointmentController
// -------------------------------------------------------------
try {
    $controller = new AppointmentController($mailConfig);
    $result = $controller->handle($requestData);

    // Record rate limit timestamp only on successful or processed attempt
    $requests[] = $currentTime;
    @file_put_contents($rateLimitFile, json_encode($requests), LOCK_EX);

    if ($result['success']) {
        sendSuccessResponse($result['message']);
    } else {
        $extra = isset($result['errors']) ? ['errors' => $result['errors']] : [];
        sendJsonResponse($result['statusCode'] ?? 400, false, $result['message'], $extra);
    }
} catch (\Throwable $e) {
    // Log unexpected errors securely without leaking internal PHP details to the visitor
    error_log('Wilma Backend Unhandled Exception: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    sendErrorResponse(500, 'Unable to submit your appointment request. Please try again.');
}
