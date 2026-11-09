# Wilma Construction – Appointment Form System (Core PHP Backend)

This is the lightweight, secure Core PHP backend for the **Wilma Construction** appointment request system. When a prospective client fills out the appointment request form on the website, this backend processes and validates the submission, then sends a formatted notification email to the business owner using **Gmail SMTP** via **PHPMailer**.

---

## 1. Directory Structure

```text
backend/
│
├── config/
│   ├── mail.php                   # Primary Gmail SMTP configuration
│   └── mail.local.php.example     # Template for local/production credentials
│
├── controllers/
│   └── AppointmentController.php  # Request validation, email template, and PHPMailer dispatch
│
├── helpers/
│   └── response.php               # Standardized JSON response helper functions
│
├── vendor/                        # Composer dependencies (PHPMailer)
│
├── .htaccess                      # Apache / LiteSpeed security rules for Hostinger
├── .gitignore                     # Prevents sensitive credentials and logs from Git
├── appointment.php                # Main public API endpoint (POST only)
├── composer.json                  # Composer dependency definition
├── composer.lock                  # Exact locked versions of dependencies
└── README.md                      # Complete installation, testing, and deployment guide
```

---

## 2. Technology & Requirements

- **PHP Version:** PHP 8.0, 8.1, 8.2, or 8.3 (Compatible with PHP 7.4+)
- **PHP Extensions:** `curl`, `openssl`, `mbstring`, `json`, `filter` (all enabled by default on Hostinger)
- **Email Library:** Official [PHPMailer](https://github.com/PHPMailer/PHPMailer) (`^7.2`)
- **Hosting Target:** Hostinger Shared Hosting (Apache / LiteSpeed with cPanel/hPanel)
- **External Dependencies:** No Node.js runtime, no MySQL, MongoDB, or external database required.

---

## 3. Gmail SMTP Setup (Step-by-Step)

Google requires modern authentication (App Passwords) for sending emails through Gmail SMTP. **Do not use your regular Gmail password!**

### Step 1: Enable 2-Step Verification
1. Log in to your Google Account at [https://myaccount.google.com/](https://myaccount.google.com/).
2. On the left navigation, select **Security**.
3. Under *"How you sign in to Google"*, select **2-Step Verification** and turn it ON.

### Step 2: Create a 16-Character App Password
1. Once 2-Step Verification is active, search for **"App passwords"** in the top search bar of your Google Account.
2. Under *"App name"*, enter **"Wilma Construction Website"**.
3. Click **Create**.
4. Google will display a yellow banner with a **16-character password** (e.g., `abcd efgh ijkl mnop`).
5. Copy this password (without spaces).

### Step 3: Configure Credentials in the Backend
You can configure credentials using either of these two methods:

#### Method A: Using `mail.local.php` (Recommended for Local & Hostinger)
1. In the `backend/config/` directory, copy `mail.local.php.example` to `mail.local.php`:
   ```bash
   cp backend/config/mail.local.php.example backend/config/mail.local.php
   ```
2. Open `backend/config/mail.local.php` and enter your details:
   ```php
   <?php
   return [
       'smtp_username'   => 'your-business-email@gmail.com',
       'smtp_password'   => 'abcdefghijklmnop', // Your 16-char App Password
       'recipient_email' => 'your-business-email@gmail.com',
       'recipient_name'  => 'Wilma Construction Management',
       'from_email'      => 'your-business-email@gmail.com',
       'from_name'       => 'Wilma Construction Website',
   ];
   ```
   *(Note: `mail.local.php` is listed in `.gitignore` so your password will never be accidentally committed to Git).*

#### Method B: Directly in `backend/config/mail.php`
Edit `backend/config/mail.php` and replace the placeholder values in the `'smtp_username'` and `'smtp_password'` fields.

---

## 4. API Specification

### Endpoint
- **URL:** `POST /backend/appointment.php`
- **Content-Type:** `application/json`
- **Allowed Method:** `POST`

### Accepted Form Fields

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullName` | String | **Yes** | Client full name (max 120 chars) |
| `companyName` | String | **Yes** | Company / Organization name (max 150 chars) |
| `email` | String | **Yes** | Client business email address |
| `phone` | String | **Yes** | Contact phone number (e.g. `+386 69 803 622`) |
| `serviceRequired` | String | **Yes** | Selected service / worker qualification |
| `projectLocation` | String | **Yes** | Construction site or project location in Slovenia |
| `preferredDate` | String | **Yes** | Desired meeting date (`YYYY-MM-DD`) |
| `preferredTime` | String | No | Preferred meeting time (`HH:MM`) |
| `message` | String | No | Project description or worker quantity specifications |
| `_hp_website` | String | No | **Honeypot field** (Leave empty; filled only by bots) |

### Sample JSON Request

```json
{
  "fullName": "Janez Novak",
  "companyName": "Gradbene Storitve d.o.o.",
  "email": "janez.novak@example.si",
  "phone": "+386 40 123 456",
  "serviceRequired": "Zidarska dela in podizvajalstvo",
  "projectLocation": "Ljubljana Center",
  "preferredDate": "2026-11-20",
  "preferredTime": "10:00",
  "message": "Potrebujemo ekipo 4 izkušenih zidarjev za začetek naslednji mesec.",
  "_hp_website": ""
}
```

### JSON Response Format

#### Success (HTTP 200 OK):
```json
{
  "success": true,
  "message": "Your appointment request has been submitted successfully."
}
```

#### Client Error (HTTP 400 Bad Request):
```json
{
  "success": false,
  "message": "Full name is required."
}
```

#### Method Not Allowed (HTTP 405 Method Not Allowed):
```json
{
  "success": false,
  "message": "Method Not Allowed. Only POST requests are accepted."
}
```

#### Rate Limit Exceeded (HTTP 429 Too Many Requests):
```json
{
  "success": false,
  "message": "Too many requests. Please wait a few minutes before submitting again."
}
```

#### Server Error (HTTP 500 Internal Server Error):
```json
{
  "success": false,
  "message": "Unable to submit your appointment request. Please try again."
}
```

---

## 5. Security Protections Implemented

1. **POST Method Enforcement:** Automatically rejects `GET`, `PUT`, `DELETE` requests with HTTP 405.
2. **Payload Size Guard:** Rejects payloads over 64 KB with HTTP 413 to prevent memory exhaustion.
3. **Spam Honeypot Detection:** Silently thwarts automated bots that fill in hidden honeypot inputs (`_hp_website`, `website`, etc.).
4. **Lightweight Rate Limiting:** Enforces a maximum of 5 submissions per 10-minute window per IP address using a file-based cache in `sys_get_temp_dir()`, avoiding any database overhead.
5. **Email Header Injection Shield:** Strips carriage returns (`\r`), line feeds (`\n`), and null bytes (`\0`) from user-supplied name and email headers.
6. **Strict HTML Escaping:** All dynamic values in the email body are escaped with `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')` to prevent HTML injection in mail clients.
7. **Directory & Sensitive File Shield:** `.htaccess` blocks direct browser access to `.json`, `.lock`, `.env`, `config/`, and `vendor/`.
8. **Credential Protection:** Internal server errors, database paths, and SMTP passwords are never returned in API responses.

---

## 6. Local Testing Instructions

### Option 1: Using PHP's Built-in Development Server
1. From the project root, start PHP's built-in web server:
   ```bash
   php -S localhost:8000 -t .
   ```
2. In another terminal, start the React frontend Vite dev server:
   ```bash
   cd frontend
   npm run dev
   ```
   *(The Vite dev server automatically proxies `/backend` requests to `http://localhost:8000/backend/appointment.php`).*

### Option 2: Testing with cURL

Test with a valid submission:
```bash
curl -X POST http://localhost:8000/backend/appointment.php \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Janez Novak","companyName":"Wilma Gradnje","email":"janez@example.com","phone":"+386 40 123 456","serviceRequired":"Splošna gradbena dela","projectLocation":"Ljubljana","preferredDate":"2026-11-25"}'
```

Test empty submission (should return HTTP 400):
```bash
curl -X POST http://localhost:8000/backend/appointment.php \
  -H "Content-Type: application/json" \
  -d '{}'
```

Test invalid method (should return HTTP 405):
```bash
curl -X GET http://localhost:8000/backend/appointment.php
```

---

## 7. Hostinger Shared Hosting Deployment Guide

### Architecture on Hostinger
On Hostinger Shared Hosting, your web root is typically `public_html/`.

```text
public_html/
│
├── index.html                   # Built React index.html
├── assets/                      # Built React JS & CSS bundles
├── images/                      # Static images
├── robots.txt / sitemap.xml
│
└── backend/                     # The entire backend folder
    ├── config/
    │   ├── mail.php
    │   └── mail.local.php       # Your actual Gmail App Password on the server
    ├── controllers/
    │   └── AppointmentController.php
    ├── helpers/
    │   └── response.php
    ├── vendor/                  # PHPMailer & Composer autoload
    ├── appointment.php          # Accessible at https://YOUR-DOMAIN.com/backend/appointment.php
    └── .htaccess                # Protects config/ and vendor/
```

### Step-by-Step Deployment:
1. **Build the React Frontend:**
   ```bash
   cd frontend
   npm run build
   ```
   This generates the production assets in `frontend/dist/`.

2. **Upload Frontend Files:**
   Upload the contents of `frontend/dist/` directly into Hostinger's `public_html/` folder using Hostinger's File Manager or FTP (FileZilla).

3. **Upload the `backend/` Folder:**
   Upload the entire `backend/` folder directly into `public_html/backend/`. Ensure that:
   - `backend/vendor/` is included (or run `composer install` via Hostinger SSH/Terminal if enabled).
   - `backend/appointment.php` is located at `public_html/backend/appointment.php`.
   - `backend/.htaccess` is uploaded (ensure dot-files are visible in your FTP client).

4. **Add Gmail Credentials on Hostinger:**
   In Hostinger File Manager:
   - Navigate to `public_html/backend/config/`.
   - Create or edit `mail.local.php`.
   - Paste your real Gmail address and 16-character App Password.
   - Save the file.

5. **Verify Live Deployment:**
   - Open your website in a browser: `https://your-domain.com`
   - Fill out the appointment form and click **"Zahtevajte termin sestanka"**.
   - Check the business Gmail inbox for the incoming appointment notification.
