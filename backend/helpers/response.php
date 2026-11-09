<?php
/**
 * Wilma Construction - JSON Response Helper
 *
 * Provides reusable helper functions for sending standardized JSON responses
 * with correct HTTP status codes and security headers.
 *
 * Standard Response Formats:
 * Success: {"success": true, "message": "..."}
 * Error:   {"success": false, "message": "..."}
 */

// Prevent direct script access via URL
if (!defined('APP_INIT')) {
    http_response_code(403);
    exit('Direct access not permitted.');
}

/**
 * Send a standardized JSON response and terminate script execution.
 *
 * @param int    $statusCode HTTP status code (200, 400, 405, 429, 500)
 * @param bool   $success    Whether the operation was successful
 * @param string $message    User-facing status message
 * @param array  $extra      Optional additional data (e.g. validation details)
 * @return void
 */
function sendJsonResponse(int $statusCode, bool $success, string $message, array $extra = []): void
{
    // Discard any previous buffer content (e.g. accidental PHP notices)
    if (ob_get_level() > 0) {
        ob_clean();
    }

    http_response_code($statusCode);

    // Set standardized security and JSON headers
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    $payload = array_merge([
        'success' => $success,
        'message' => $message,
    ], $extra);

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Send a successful JSON response (HTTP 200).
 *
 * @param string $message Success message
 * @param array  $extra   Optional extra data
 * @return void
 */
function sendSuccessResponse(string $message = 'Your appointment request has been submitted successfully.', array $extra = []): void
{
    sendJsonResponse(200, true, $message, $extra);
}

/**
 * Send an error JSON response with custom HTTP status code.
 *
 * @param int    $statusCode HTTP status code (e.g. 400, 405, 429, 500)
 * @param string $message    Error message
 * @param array  $extra      Optional extra data
 * @return void
 */
function sendErrorResponse(int $statusCode = 400, string $message = 'Unable to submit your appointment request. Please try again.', array $extra = []): void
{
    sendJsonResponse($statusCode, false, $message, $extra);
}
