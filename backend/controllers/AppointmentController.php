<?php
/**
 * Wilma Construction - Appointment Controller
 *
 * Handles appointment form requests:
 * 1. Validates and sanitizes incoming user input.
 * 2. Formats a professional HTML notification email and a plain-text alternative.
 * 3. Configures PHPMailer with Gmail SMTP and sends the email to the business owner.
 * 4. Returns standardized status arrays with appropriate HTTP codes.
 */

// Prevent direct execution via URL
if (!defined('APP_INIT')) {
    http_response_code(403);
    exit('Direct access not permitted.');
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class AppointmentController
{
    /**
     * @var array Mail server configuration array
     */
    private array $config;

    /**
     * Constructor
     *
     * @param array $config Mail settings loaded from config/mail.php
     */
    public function __construct(array $config)
    {
        $this->config = $config;
    }

    /**
     * Handle incoming appointment submission data.
     *
     * @param array $data Decoded request payload
     * @return array [ 'success' => bool, 'message' => string, 'statusCode' => int, ... ]
     */
    public function handle(array $data): array
    {
        // 1. Sanitize and extract input fields
        $fields = $this->extractAndSanitize($data);

        // 2. Validate all submitted fields
        $validationErrors = $this->validate($fields);
        if (!empty($validationErrors)) {
            $firstMessage = reset($validationErrors);
            return [
                'success'    => false,
                'message'    => $firstMessage,
                'errors'     => $validationErrors,
                'statusCode' => 400
            ];
        }

        // 3. Send email notification via Gmail SMTP
        $mailResult = $this->sendNotificationEmail($fields);
        if (!$mailResult['success']) {
            return [
                'success'    => false,
                'message'    => 'Unable to submit your appointment request. Please try again.',
                'statusCode' => 500
            ];
        }

        return [
            'success'    => true,
            'message'    => 'Your appointment request has been submitted successfully.',
            'statusCode' => 200
        ];
    }

    /**
     * Extract form fields and perform preliminary sanitization.
     * Supports both camelCase and snake_case field keys.
     *
     * @param array $data Raw input array
     * @return array Sanitized fields
     */
    private function extractAndSanitize(array $data): array
    {
        return [
            'fullName'        => $this->cleanString($data['fullName'] ?? $data['full_name'] ?? ''),
            'companyName'     => $this->cleanString($data['companyName'] ?? $data['company_name'] ?? ''),
            'email'           => $this->cleanString($data['email'] ?? ''),
            'phone'           => $this->cleanString($data['phone'] ?? ''),
            'serviceRequired' => $this->cleanString($data['serviceRequired'] ?? $data['service_required'] ?? ''),
            'projectLocation' => $this->cleanString($data['projectLocation'] ?? $data['project_location'] ?? ''),
            'preferredDate'   => $this->cleanString($data['preferredDate'] ?? $data['preferred_date'] ?? ''),
            'preferredTime'   => $this->cleanString($data['preferredTime'] ?? $data['preferred_time'] ?? ''),
            'message'         => $this->cleanMultiline($data['message'] ?? ''),
        ];
    }

    /**
     * Clean single-line text inputs and strip header-injection characters (\r, \n).
     *
     * @param mixed $value
     * @return string
     */
    private function cleanString($value): string
    {
        if (!is_string($value)) {
            return '';
        }
        // Remove null bytes and CR/LF characters to prevent header injection
        $cleaned = str_replace(["\0", "\r", "\n"], '', $value);
        return trim($cleaned);
    }

    /**
     * Clean multi-line message inputs, preserving intentional paragraph line breaks.
     *
     * @param mixed $value
     * @return string
     */
    private function cleanMultiline($value): string
    {
        if (!is_string($value)) {
            return '';
        }
        // Remove null bytes and normalize carriage returns
        $cleaned = str_replace(["\0", "\r\n", "\r"], ["", "\n", "\n"], $value);
        return trim($cleaned);
    }

    /**
     * Validate all submitted fields.
     *
     * @param array $fields Sanitized fields
     * @return array Map of field name => error message
     */
    private function validate(array $fields): array
    {
        $errors = [];

        // Full Name
        if ($fields['fullName'] === '') {
            $errors['fullName'] = 'Full name is required.';
        } elseif (mb_strlen($fields['fullName']) > 120) {
            $errors['fullName'] = 'Full name must not exceed 120 characters.';
        }

        // Company Name
        if ($fields['companyName'] === '') {
            $errors['companyName'] = 'Company name is required.';
        } elseif (mb_strlen($fields['companyName']) > 150) {
            $errors['companyName'] = 'Company name must not exceed 150 characters.';
        }

        // Email Address
        if ($fields['email'] === '') {
            $errors['email'] = 'Email address is required.';
        } elseif (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please enter a valid email address.';
        } elseif (mb_strlen($fields['email']) > 150) {
            $errors['email'] = 'Email address is too long.';
        }

        // Phone Number
        if ($fields['phone'] === '') {
            $errors['phone'] = 'Phone number is required.';
        } elseif (!preg_match('/^[\d\s\+\-\(\)\.]{7,25}$/', $fields['phone'])) {
            $errors['phone'] = 'Please enter a valid phone number (e.g. +386 69 803 622).';
        }

        // Service Required
        if ($fields['serviceRequired'] === '') {
            $errors['serviceRequired'] = 'Please select a required service.';
        } elseif (mb_strlen($fields['serviceRequired']) > 200) {
            $errors['serviceRequired'] = 'Service description is too long.';
        }

        // Project Location
        if ($fields['projectLocation'] === '') {
            $errors['projectLocation'] = 'Project location is required.';
        } elseif (mb_strlen($fields['projectLocation']) > 150) {
            $errors['projectLocation'] = 'Project location is too long.';
        }

        // Preferred Date
        if ($fields['preferredDate'] === '') {
            $errors['preferredDate'] = 'Preferred appointment date is required.';
        } else {
            $d = DateTime::createFromFormat('Y-m-d', $fields['preferredDate']);
            if (!$d || $d->format('Y-m-d') !== $fields['preferredDate']) {
                $errors['preferredDate'] = 'Preferred date must be in YYYY-MM-DD format.';
            }
        }

        // Preferred Time (Optional, format check if provided)
        if ($fields['preferredTime'] !== '') {
            if (!preg_match('/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/', $fields['preferredTime'])) {
                $errors['preferredTime'] = 'Preferred time must be in HH:MM format.';
            }
        }

        // Additional Message (Optional, length limit)
        if ($fields['message'] !== '' && mb_strlen($fields['message']) > 3000) {
            $errors['message'] = 'Message is too long (maximum 3000 characters).';
        }

        return $errors;
    }

    /**
     * Send email notification to business owner via Gmail SMTP with PHPMailer.
     *
     * @param array $fields Sanitized and validated fields
     * @return array [ 'success' => bool, 'error' => string ]
     */
    private function sendNotificationEmail(array $fields): array
    {
        $mail = new PHPMailer(true);

        try {
            // SMTP Server Configuration
            $mail->isSMTP();
            $mail->Host       = $this->config['smtp_host'] ?? 'smtp.gmail.com';
            $mail->SMTPAuth   = (bool)($this->config['smtp_auth'] ?? true);
            $mail->Username   = $this->config['smtp_username'] ?? '';
            $mail->Password   = $this->config['smtp_password'] ?? '';
            $mail->Port       = (int)($this->config['smtp_port'] ?? 587);
            $mail->Timeout    = (int)($this->config['timeout'] ?? 15);
            $mail->CharSet    = 'UTF-8';
            $mail->SMTPDebug  = (int)($this->config['debug_level'] ?? 0);

            // Configure TLS/SSL encryption
            $encryption = strtolower($this->config['smtp_encryption'] ?? 'tls');
            if ($encryption === 'ssl' || $mail->Port === 465) {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            } else {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            }

            // Sender and Recipient
            $fromEmail = $this->config['from_email'] ?? $this->config['smtp_username'];
            $fromName  = $this->config['from_name'] ?? 'Wilma Construction Website';
            $mail->setFrom($fromEmail, $fromName);

            $recipientEmail = $this->config['recipient_email'] ?? $fromEmail;
            $recipientName  = $this->config['recipient_name'] ?? 'Wilma Construction Management';
            $mail->addAddress($recipientEmail, $recipientName);

            // Set customer's email as Reply-To
            $mail->addReplyTo($fields['email'], $fields['fullName']);

            // Email Content & Subject
            $submissionDate = date('Y-m-d');
            $submissionTime = date('H:i:s T');

            $mail->isHTML(true);
            $mail->Subject = $this->config['email_subject'] ?? 'New Appointment Request – Wilma Construction';
            $mail->Body    = $this->buildHtmlEmailBody($fields, $submissionDate, $submissionTime);
            $mail->AltBody = $this->buildPlainTextEmailBody($fields, $submissionDate, $submissionTime);

            $mail->send();

            return ['success' => true, 'error' => ''];
        } catch (Exception $e) {
            // Log error securely to server log without leaking to client
            error_log('Wilma Appointment Mail Error: ' . $mail->ErrorInfo . ' | Exception: ' . $e->getMessage());
            return ['success' => false, 'error' => $mail->ErrorInfo];
        }
    }

    /**
     * Build the professional responsive HTML email body.
     *
     * @param array  $fields         Customer & appointment details
     * @param string $submissionDate Submission date
     * @param string $submissionTime Submission time
     * @return string HTML email content
     */
    private function buildHtmlEmailBody(array $fields, string $submissionDate, string $submissionTime): string
    {
        // Safe HTML escaping helper
        $e = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');

        $fullName        = $e($fields['fullName']);
        $companyName     = $e($fields['companyName']);
        $email           = $e($fields['email']);
        $phone           = $e($fields['phone']);
        $serviceRequired = $e($fields['serviceRequired']);
        $projectLocation = $e($fields['projectLocation']);
        $preferredDate   = $e($fields['preferredDate']);
        $preferredTime   = !empty($fields['preferredTime']) ? $e($fields['preferredTime']) : '<em>Ni določeno / Not specified</em>';
        $messageContent  = !empty($fields['message'])
            ? nl2br($e($fields['message']))
            : '<em style="color: #888888;">Ni dodatnega sporočila / No additional message</em>';

        return <<<HTML
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Request – Wilma Construction</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #24292f;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f4f6f8;
      padding: 30px 10px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
      border: 1px solid #e1e4e8;
    }
    .header {
      background: linear-gradient(135deg, #0e1b2e 0%, #162a45 100%);
      color: #ffffff;
      padding: 32px 30px;
      text-align: center;
      border-bottom: 4px solid #c6923c;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #ffffff;
      text-transform: uppercase;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      color: #c6923c;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content {
      padding: 30px;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #0e1b2e;
      margin: 24px 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 2px solid #f0f2f5;
    }
    .section-title:first-child {
      margin-top: 0;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    .info-table td {
      padding: 9px 12px;
      font-size: 14px;
      vertical-align: top;
      border-bottom: 1px solid #f0f2f5;
    }
    .info-table td.label {
      width: 36%;
      color: #586069;
      font-weight: 600;
      background-color: #fafbfc;
    }
    .info-table td.value {
      width: 64%;
      color: #1f2328;
      font-weight: 500;
    }
    .message-box {
      background-color: #f8fafc;
      border-left: 4px solid #c6923c;
      padding: 14px 18px;
      margin-top: 10px;
      border-radius: 0 4px 4px 0;
      font-size: 14px;
      line-height: 1.6;
      color: #24292f;
      word-break: break-word;
    }
    .badge {
      display: inline-block;
      background-color: #eaf3ff;
      color: #0969da;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 13px;
    }
    .footer {
      background-color: #fafbfc;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid #e1e4e8;
      font-size: 12px;
      color: #6a737d;
      line-height: 1.5;
    }
    .footer strong {
      color: #0e1b2e;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Brand Header -->
      <div class="header">
        <h1>Wilma Construction</h1>
        <p>New Appointment Request</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <!-- Customer Information -->
        <div class="section-title">Customer Information</div>
        <table class="info-table" role="presentation">
          <tr>
            <td class="label">Name:</td>
            <td class="value"><strong>{$fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Company Name:</td>
            <td class="value">{$companyName}</td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td class="value"><a href="mailto:{$email}" style="color: #0969da; text-decoration: none;">{$email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone:</td>
            <td class="value"><a href="tel:{$phone}" style="color: #0969da; text-decoration: none;">{$phone}</a></td>
          </tr>
          <tr>
            <td class="label">Project Location:</td>
            <td class="value">{$projectLocation}</td>
          </tr>
        </table>

        <!-- Appointment Information -->
        <div class="section-title">Appointment Information</div>
        <table class="info-table" role="presentation">
          <tr>
            <td class="label">Selected Service:</td>
            <td class="value"><span class="badge">{$serviceRequired}</span></td>
          </tr>
          <tr>
            <td class="label">Preferred Date:</td>
            <td class="value"><strong>{$preferredDate}</strong></td>
          </tr>
          <tr>
            <td class="label">Preferred Time:</td>
            <td class="value">{$preferredTime}</td>
          </tr>
        </table>

        <!-- Additional Message -->
        <div class="section-title">Additional Message</div>
        <div class="message-box">
          {$messageContent}
        </div>

        <!-- Submission Information -->
        <div class="section-title">Submission Information</div>
        <table class="info-table" role="presentation">
          <tr>
            <td class="label">Date:</td>
            <td class="value">{$submissionDate}</td>
          </tr>
          <tr>
            <td class="label">Time:</td>
            <td class="value">{$submissionTime}</td>
          </tr>
        </table>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>
          <strong>Wilma Construction</strong> – Appointment Notification System<br>
          This is an automated notification. To reply to the client, simply click Reply in your email client.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
HTML;
    }

    /**
     * Build the plain-text alternative email body.
     *
     * @param array  $fields         Customer & appointment details
     * @param string $submissionDate Submission date
     * @param string $submissionTime Submission time
     * @return string Plain text email content
     */
    private function buildPlainTextEmailBody(array $fields, string $submissionDate, string $submissionTime): string
    {
        $preferredTime = !empty($fields['preferredTime']) ? $fields['preferredTime'] : 'Not specified';
        $message       = !empty($fields['message']) ? $fields['message'] : 'No message provided';

        return <<<TEXT
============================================================
WILMA CONSTRUCTION
New Appointment Request
============================================================

CUSTOMER INFORMATION:
- Name:             {$fields['fullName']}
- Company Name:     {$fields['companyName']}
- Email:            {$fields['email']}
- Phone:            {$fields['phone']}
- Project Location: {$fields['projectLocation']}

APPOINTMENT INFORMATION:
- Selected Service: {$fields['serviceRequired']}
- Preferred Date:   {$fields['preferredDate']}
- Preferred Time:   {$preferredTime}

ADDITIONAL MESSAGE:
{$message}

SUBMISSION INFORMATION:
- Date:             {$submissionDate}
- Time:             {$submissionTime}

============================================================
Reply to this email directly to contact {$fields['fullName']} ({$fields['email']}).
Sent from Wilma Construction Website Appointment System.
TEXT;
    }
}
