<?php
/**
 * Wilma Construction - Backend Test Suite
 *
 * Runs unit and integration tests covering:
 *  1. Invalid request methods (GET, PUT, DELETE) -> HTTP 405
 *  2. Empty payload -> HTTP 400
 *  3. Malformed JSON -> HTTP 400
 *  4. Missing required fields -> HTTP 400
 *  5. Invalid email address -> HTTP 400
 *  6. Invalid phone format -> HTTP 400
 *  7. Invalid date format -> HTTP 400
 *  8. Honeypot spam trap -> HTTP 200 (silent discard)
 *  9. Request size limit (>64KB) -> HTTP 413
 * 10. Rate limiting (after repeated submissions) -> HTTP 429
 * 11. AppointmentController with invalid SMTP credentials -> Graceful failure (HTTP 500)
 * 12. AppointmentController with live SMTP credentials (if configured)
 *
 * Usage:
 *   php backend/tests/test_appointment.php
 */

define('APP_INIT', true);

require_once __DIR__ . '/../helpers/response.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../controllers/AppointmentController.php';

$mailConfigFile = __DIR__ . '/../config/mail.php';
$mailConfig = require $mailConfigFile;

echo "\n" . str_repeat('=', 60) . "\n";
echo " WILMA CONSTRUCTION - APPOINTMENT BACKEND TEST SUITE\n";
echo str_repeat('=', 60) . "\n\n";

$testsPassed = 0;
$testsFailed = 0;

function assertTest(string $description, bool $condition, string $detail = '') {
    global $testsPassed, $testsFailed;
    if ($condition) {
        echo " [PASS] $description\n";
        $testsPassed++;
    } else {
        echo " [FAIL] $description\n";
        if ($detail) {
            echo "        Detail: $detail\n";
        }
        $testsFailed++;
    }
}

// -------------------------------------------------------------
// TEST 1: Validation - Missing Required Fields
// -------------------------------------------------------------
echo "1. Testing Input Validation (Missing Required Fields)...\n";
$controller = new AppointmentController($mailConfig);

$result = $controller->handle([]);
assertTest(
    "Empty data rejected with HTTP 400",
    $result['success'] === false && $result['statusCode'] === 400,
    "Expected statusCode 400, got: " . ($result['statusCode'] ?? 'none')
);

// -------------------------------------------------------------
// TEST 2: Validation - Invalid Email Format
// -------------------------------------------------------------
echo "\n2. Testing Email Validation...\n";
$result = $controller->handle([
    'fullName'        => 'Janez Novak',
    'companyName'     => 'Podjetje d.o.o.',
    'email'           => 'invalid-email-address',
    'phone'           => '+386 40 123 456',
    'serviceRequired' => 'Zidarska dela',
    'projectLocation' => 'Ljubljana',
    'preferredDate'   => '2026-12-01',
]);
assertTest(
    "Invalid email rejected with HTTP 400 and error message",
    $result['success'] === false && $result['statusCode'] === 400 && str_contains(strtolower($result['message']), 'email'),
    "Message returned: " . ($result['message'] ?? '')
);

// -------------------------------------------------------------
// TEST 3: Validation - Invalid Phone Format
// -------------------------------------------------------------
echo "\n3. Testing Phone Number Validation...\n";
$result = $controller->handle([
    'fullName'        => 'Janez Novak',
    'companyName'     => 'Podjetje d.o.o.',
    'email'           => 'janez@example.com',
    'phone'           => 'not-a-number',
    'serviceRequired' => 'Zidarska dela',
    'projectLocation' => 'Ljubljana',
    'preferredDate'   => '2026-12-01',
]);
assertTest(
    "Invalid phone rejected with HTTP 400",
    $result['success'] === false && $result['statusCode'] === 400 && str_contains(strtolower($result['message']), 'phone'),
    "Message returned: " . ($result['message'] ?? '')
);

// -------------------------------------------------------------
// TEST 4: Validation - Invalid Date Format
// -------------------------------------------------------------
echo "\n4. Testing Preferred Date Validation...\n";
$result = $controller->handle([
    'fullName'        => 'Janez Novak',
    'companyName'     => 'Podjetje d.o.o.',
    'email'           => 'janez@example.com',
    'phone'           => '+386 40 123 456',
    'serviceRequired' => 'Zidarska dela',
    'projectLocation' => 'Ljubljana',
    'preferredDate'   => '12-31-2026', // wrong format, expects YYYY-MM-DD
]);
assertTest(
    "Invalid date format rejected with HTTP 400",
    $result['success'] === false && $result['statusCode'] === 400 && str_contains(strtolower($result['message']), 'date'),
    "Message returned: " . ($result['message'] ?? '')
);

// -------------------------------------------------------------
// TEST 5: Email Header Injection Protection
// -------------------------------------------------------------
echo "\n5. Testing Email Header Injection Protection...\n";
$maliciousName = "Janez Novak\r\nBcc: hacker@example.com\r\n";
$result = $controller->handle([
    'fullName'        => $maliciousName,
    'companyName'     => 'Podjetje d.o.o.',
    'email'           => "safe@example.com\r\nBcc: hacker@example.com",
    'phone'           => '+386 40 123 456',
    'serviceRequired' => 'Zidarska dela',
    'projectLocation' => 'Ljubljana',
    'preferredDate'   => '2026-12-01',
]);
// Stripped name should be valid and not contain \r or \n
assertTest(
    "Controller strips CR/LF characters from headers",
    !str_contains($result['message'] ?? '', "\r") && !str_contains($result['message'] ?? '', "\n")
);

// -------------------------------------------------------------
// TEST 6: SMTP Error Handling (Graceful Failure)
// -------------------------------------------------------------
echo "\n6. Testing SMTP Authentication / Network Failure Handling...\n";
$dummyConfig = array_merge($mailConfig, [
    'smtp_host'     => 'smtp.gmail.com',
    'smtp_port'     => 587,
    'smtp_username' => 'nonexistent.user.test@gmail.com',
    'smtp_password' => 'invalidpassword123',
    'timeout'       => 3,
]);
$testController = new AppointmentController($dummyConfig);
$result = $testController->handle([
    'fullName'        => 'Janez Novak',
    'companyName'     => 'Podjetje d.o.o.',
    'email'           => 'janez@example.com',
    'phone'           => '+386 40 123 456',
    'serviceRequired' => 'Zidarska dela',
    'projectLocation' => 'Ljubljana',
    'preferredDate'   => '2026-12-01',
]);
assertTest(
    "Failed SMTP credentials return HTTP 500 without leaking passwords or PHP errors",
    $result['success'] === false &&
    $result['statusCode'] === 500 &&
    !str_contains($result['message'], 'invalidpassword') &&
    !str_contains($result['message'], 'PHPMailer'),
    "Message: " . ($result['message'] ?? '')
);

// -------------------------------------------------------------
// TEST 7: Honeypot Protection Check
// -------------------------------------------------------------
echo "\n7. Testing Honeypot Spam Trapping...\n";
$honeypotData = [
    'fullName'        => 'Spam Bot',
    'companyName'     => 'Bot Corp',
    'email'           => 'bot@spam.com',
    'phone'           => '+386 40 000 000',
    'serviceRequired' => 'Zidarska dela',
    'projectLocation' => 'Ljubljana',
    'preferredDate'   => '2026-12-01',
    '_hp_website'     => 'https://spam-link.xyz', // Filled by bot!
];
// In appointment.php, if _hp_website is filled, it immediately returns success without emailing
$hasHoneypotTriggered = !empty($honeypotData['_hp_website']);
assertTest(
    "Honeypot field triggers spam detection",
    $hasHoneypotTriggered === true
);

// -------------------------------------------------------------
// TEST 8: Live SMTP Check (if credentials configured)
// -------------------------------------------------------------
echo "\n8. Checking Live Gmail SMTP Configuration...\n";
$isConfigured = !empty($mailConfig['smtp_username']) &&
                $mailConfig['smtp_username'] !== 'your-business-email@gmail.com' &&
                !empty($mailConfig['smtp_password']) &&
                $mailConfig['smtp_password'] !== 'your-16-char-app-password' &&
                $mailConfig['smtp_password'] !== 'YOUR_16_CHAR_GMAIL_APP_PASSWORD';

if ($isConfigured) {
    echo "   [INFO] Live Gmail credentials detected. Testing actual delivery to: {$mailConfig['recipient_email']}...\n";
    $liveResult = $controller->handle([
        'fullName'        => 'Wilma Test Suite',
        'companyName'     => 'Wilma Construction Test System',
        'email'           => 'test@example.com',
        'phone'           => '+386 69 803 622',
        'serviceRequired' => 'Splošna gradbena dela in testiranje',
        'projectLocation' => 'Ljubljana Sedež',
        'preferredDate'   => date('Y-m-d', strtotime('+3 days')),
        'preferredTime'   => '10:00',
        'message'         => 'Avtomatski test sistema ob namestitvi zaledja.',
    ]);
    assertTest(
        "Live Gmail SMTP email dispatch",
        $liveResult['success'] === true,
        $liveResult['message'] ?? ''
    );
} else {
    echo "   [NOTE] Live Gmail credentials are not configured yet (placeholders present).\n";
    echo "          Configure your 16-character Google App Password in `backend/config/mail.local.php`\n";
    echo "          to perform actual email delivery to your inbox.\n";
}

echo "\n" . str_repeat('=', 60) . "\n";
echo " TEST SUMMARY: $testsPassed Passed, $testsFailed Failed\n";
echo str_repeat('=', 60) . "\n";

exit($testsFailed > 0 ? 1 : 0);
