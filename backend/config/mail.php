<?php
/**
 * Wilma Construction - Gmail SMTP Mail Configuration
 *
 * This file configures the outgoing email server using Gmail SMTP.
 *
 * IMPORTANT SECURITY NOTICE:
 * - Never use your personal Gmail account login password here!
 * - Gmail requires a 16-character "App Password".
 *   To create one:
 *   1. Visit: https://myaccount.google.com/security
 *   2. Turn on 2-Step Verification if not already enabled.
 *   3. Search for "App passwords" in the top search bar.
 *   4. Create an App password (e.g. named "Wilma Construction Website").
 *   5. Copy the 16-character code (without spaces) and paste it below.
 *
 * You can configure credentials in 3 ways:
 *   Option A: Edit the values directly in this file.
 *   Option B: Create backend/config/mail.local.php (recommended, ignored by git).
 *   Option C: Set environment variables (SMTP_USERNAME, SMTP_PASSWORD, etc.).
 */

// Prevent direct web access
if (!defined('APP_INIT')) {
    http_response_code(403);
    exit('Direct access not permitted.');
}

// Check for local credentials override file (mail.local.php)
$localConfig = [];
$localConfigFile = __DIR__ . '/mail.local.php';
if (file_exists($localConfigFile)) {
    $localConfig = require $localConfigFile;
}

$defaultConfig = [
    // -------------------------------------------------------------
    // SMTP Server Settings
    // -------------------------------------------------------------
    'smtp_host'       => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
    'smtp_port'       => (int)(getenv('SMTP_PORT') ?: 587),
    'smtp_encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls', // 'tls' (STARTTLS for port 587) or 'ssl' (for port 465)
    'smtp_auth'       => true,

    // -------------------------------------------------------------
    // Gmail SMTP Authentication Credentials
    // -------------------------------------------------------------
    // Website owner's Gmail address
    'smtp_username'   => getenv('SMTP_USERNAME') ?: 'abbassalman813@gmail.com',

    // 16-character Gmail App Password (NOT your normal Google login password)
    'smtp_password'   => getenv('SMTP_PASSWORD') ?: 'wynotgqohifuxwzs',

    // -------------------------------------------------------------
    // Email Notification Recipient
    // -------------------------------------------------------------
    // The business owner/manager email address where appointment requests are delivered
    'recipient_email' => getenv('RECIPIENT_EMAIL') ?: 'info.williamconstruction@gmail.com',
    'recipient_name'  => getenv('RECIPIENT_NAME') ?: 'Wilma Construction Management',

    // -------------------------------------------------------------
    // Outgoing Email Sender
    // -------------------------------------------------------------
    // Gmail SMTP requires the From address to match or be authorized by the authenticated Gmail account
    'from_email'      => getenv('FROM_EMAIL') ?: (getenv('SMTP_USERNAME') ?: 'abbassalman813@gmail.com'),
    'from_name'       => getenv('FROM_NAME') ?: 'Wilma Construction Website',

    // -------------------------------------------------------------
    // Email Subject Line
    // -------------------------------------------------------------
    'email_subject'   => 'New Appointment Request – Wilma Construction',

    // -------------------------------------------------------------
    // Connection Settings & Debugging
    // -------------------------------------------------------------
    // Socket connection timeout in seconds
    'timeout'         => 15,

    // SMTP debug level: 0 = off, 1 = client commands, 2 = client and server responses
    // ALWAYS KEEP AT 0 IN PRODUCTION to avoid leaking credentials or server details
    'debug_level'     => 0,
];

return is_array($localConfig) ? array_merge($defaultConfig, $localConfig) : $defaultConfig;
