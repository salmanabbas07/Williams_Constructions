<div align="center">

# 🏗️ Williams Constructions — Construction Workforce & Manpower Platform

**Official Production Website:** [https://williamsconstruction.si](https://williamsconstruction.si)

[![Production Domain](https://img.shields.io/badge/Domain-williamsconstruction.si-C85A17?style=for-the-badge)](https://williamsconstruction.si)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=fff)](https://vitejs.dev/)
[![PHP](https://img.shields.io/badge/Backend-Core%20PHP%20%2B%20PHPMailer-777BB4?style=for-the-badge&logo=php&logoColor=fff)](https://www.php.net/)
[![SEO](https://img.shields.io/badge/SSG%20Routes-18%20Pre--rendered-16A34A?style=for-the-badge)](#%EF%B8%8F-pre-rendered-routes--sitemap)

*Full-stack web application for **Williams Services / Williams Constructions** (Ljubljana, Slovenia) — connecting Slovenian construction, infrastructure, welding, and industrial companies with legally compliant, safety-certified skilled tradesmen.*

</div>

---

## 📌 Overview

**Williams Constructions** specializes in deploying certified TIG/MIG/MAG welders (ISO 9606-1), masons, formwork carpenters, steel fixers, heavy machinery operators, and general construction teams across **Slovenia**.

This repository combines:
- **React 19 + Vite 6 Frontend** with custom static pre-rendering (`scripts/prerender.mjs`) generating **18 SEO-optimized HTML routes** at build time (`9` core pages + `8` modal/article blog routes + `404.html`).
- **Lightweight Core PHP Backend** (`backend/appointment.php`) powered by **PHPMailer** & Gmail SMTP — zero database dependencies, engineered for direct deployment on shared Apache/LiteSpeed hosting (e.g., Hostinger).

---

## ✨ Key Features

- **Slovenian-First Experience (`sl-SI`)**: Complete user-facing copy, technical guides, compliance checklists, FAQs, and form validation tailored for the Slovenian construction market.
- **Hybrid SPA + Static Pre-Rendering (SSG)**: Seamless client-side transitions paired with full static HTML snapshots generated via headless Chromium/Edge during `npm run build`.
- **Deep-Linkable Blog Articles (`/blog/:slug`)**: All 8 articles preserve their interactive reader modal experience on desktop & mobile while exposing crawlable URLs, unique titles/descriptions, `BlogPosting` JSON-LD, and sitemap entries.
- **Rich Structured Data (`JSON-LD`)**: Automatically outputs schema graphs across pages (`Organization`, `LocalBusiness`, `WebSite`, `AboutPage`, `ItemList` + `Service`, `CollectionPage`, `Blog`, `BlogPosting`, `FAQPage`, `ContactPage`, `BreadcrumbList`).
- **Performance & Core Web Vitals**:
  - **28 optimized `.webp` images** with explicit `width`/`height` dimensions to prevent CLS.
  - Route-level code splitting (`React.lazy` + custom hover/focus preloading) and manual vendor chunking (`vendor-react`, `vendor-motion`, `vendor-swiper`, `vendor-icons`).
  - Route-aware LCP hero preloading (`fetchpriority="high"`).
- **Apache Server Hardening (`public/.htaccess`)**: Enforces HTTPS and non-`www` (`301`), trims trailing slashes (`301`), redirects legacy paths (`/industries`, `/pogosta-vprasanja`), serves pre-rendered directories, isolates `/backend/`, and returns real HTTP `404` status codes for unknown URLs.
- **Secure Appointment API (`backend/`)**: Input sanitization, honeypot anti-spam trap, rate limiting, strict `.htaccess` config protection, and responsive HTML email notifications via PHPMailer SMTP.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | React 19, React Router DOM v7, Vite 6, ES6+ JSX, Custom CSS Architecture |
| **UI & Motion** | Framer Motion (`LazyMotion`), Swiper.js (Hero Carousel), Lucide React Icons |
| **SEO & Metadata** | `react-helmet-async`, Headless Edge SSG (`scripts/prerender.mjs`), XML Sitemap, JSON-LD |
| **Backend API** | Core PHP (7.4 / 8.0–8.3+), Composer, PHPMailer `^7.2` (Gmail SMTP) |
| **Web Server** | Apache / LiteSpeed `.htaccess` (`mod_rewrite`, `mod_deflate`, `mod_expires`) |

---

## 📂 Repository Structure

```text
wilma_construction/
├── backend/                          # Core PHP appointment & SMTP API
│   ├── config/
│   │   ├── mail.php                  # Primary SMTP settings loader
│   │   └── mail.local.php.example    # Template for production SMTP credentials
│   ├── controllers/
│   │   └── AppointmentController.php # Validation, sanitization & HTML email dispatch
│   ├── helpers/response.php          # Unified JSON API responses
│   ├── vendor/                       # Composer dependencies (PHPMailer)
│   ├── .htaccess                     # Restricts direct access to config/logs
│   └── appointment.php               # Public POST endpoint (/backend/appointment.php)
│
├── frontend/                         # React + Vite + SSG Web Application
│   ├── public/
│   │   ├── images/                   # 28 compressed WebP project & banner assets
│   │   ├── .htaccess                 # 301 canonicals, caching, pre-render routing & 404
│   │   ├── manifest.webmanifest      # Web app manifest & icons
│   │   ├── robots.txt                # Crawler rules pointing to sitemap.xml
│   │   └── sitemap.xml               # 17 indexable URLs (core + 8 blog articles)
│   ├── scripts/
│   │   └── prerender.mjs             # Headless browser SSG generator (18 routes)
│   ├── src/
│   │   ├── components/               # Header, Footer, SEO, PageHero, Motion, Buttons
│   │   ├── data/                     # Single-source datasets (services, industries, blog, FAQ)
│   │   ├── pages/                    # Home, About, Services, Projects, HowWeWork, Blog, FAQ, Contact, Privacy, 404
│   │   ├── services/                 # API client for /backend/appointment.php
│   │   └── App.jsx                   # Router & lazy route preload coordinator
│   ├── index.html                    # Base HTML shell & static fallbacks
│   ├── package.json                  # Build & dev scripts
│   └── vite.config.js                # Vendor chunking & local /backend proxy
│
└── SEO_Audit_Fix_Report.pdf          # Complete technical SEO audit & verification report
```

---

## 🗺️ Pre-Rendered Routes & Sitemap

| Route | Purpose | Structured Data (`JSON-LD`) |
| :--- | :--- | :--- |
| `/` | Homepage (Hero, Services, Compliance, Process, Inquiry) | `Organization`, `LocalBusiness`, `WebSite` |
| `/about` | Company Overview, Vision & Leadership | `AboutPage`, `BreadcrumbList` |
| `/services` | 6 Trade & Manpower Categories | `ItemList` (6x `Service`), `BreadcrumbList` |
| `/projects` | Construction, Welding, Logistics & Industrial Sectors | `CollectionPage`, `BreadcrumbList` |
| `/how-we-work` | 6-Step Recruitment, Permit & Deployment Workflow | `WebPage`, `BreadcrumbList` |
| `/blog` | Construction & Compliance Guides Index | `Blog`, `BreadcrumbList` |
| `/blog/:slug` | **8 Pre-rendered Article Pages** (with Modal UI) | `BlogPosting`, `BreadcrumbList` |
| `/faq` | 12 Client Questions & Legal Explanations | `FAQPage`, `BreadcrumbList` |
| `/contact` | Ljubljana Office Details & Workforce Inquiry Form | `ContactPage` (`LocalBusiness`), `BreadcrumbList` |
| `/privacy-policy` | GDPR & Slovenian ZVOP-2 Data Protection Notice | `WebPage`, `BreadcrumbList` |
| `/404` | Custom Not Found Page (`noindex, nofollow`) | HTTP `404` via `.htaccess` |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** `18+` & **npm**
- **PHP** `8.0+` (for testing the appointment form API locally)
- **Microsoft Edge** or **Google Chrome** installed locally (used by `scripts/prerender.mjs` during `npm run build` for static HTML generation)

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The Vite dev server starts at `http://localhost:3000` and proxies `/backend/*` requests to `http://localhost:8000` as configured in `frontend/vite.config.js`.

### 2. Backend Setup (PHP Appointment Form)

```bash
cd backend/config
cp mail.local.php.example mail.local.php
```
Update `backend/config/mail.local.php` with your Gmail SMTP address and 16-character Google App Password (refer to [`backend/README.md`](./backend/README.md) for detailed SMTP steps).

To run the PHP server locally alongside Vite (run from the repository root so `/backend/appointment.php` resolves accurately):
```bash
php -S localhost:8000
```

---

## 📦 Production Build & SEO Pre-Rendering

Generate the production bundle + all **18 pre-rendered static HTML routes** into `frontend/dist/`:

```bash
cd frontend
npm run build
```

| Script | Command | Description |
| :--- | :--- | :--- |
| **Dev Server** | `npm run dev` | Runs Vite HMR development server |
| **Full Build (SSG)** | `npm run build` | Builds Vite bundle + pre-renders all 18 HTML routes into `dist/` |
| **SPA Only Build** | `npm run build:spa` | Runs Vite build without static HTML pre-rendering |
| **Local Preview** | `npm run preview` | Previews the built `dist/` bundle locally |

---

## 🌐 Deployment (Apache / Hostinger)

1. Run `cd frontend && npm run build` to refresh `frontend/dist/`.
2. Upload the **entire contents** of `frontend/dist/` to your web root (`public_html/`), ensuring hidden files such as **`.htaccess`** are included.
3. Upload the `backend/` folder to `public_html/backend/` with valid `backend/config/mail.local.php` credentials.
4. Ensure Apache `mod_rewrite` is active and submit `https://williamsconstruction.si/sitemap.xml` in Google Search Console.

---

## 📞 Business Information

**Williams Services / Williams Constructions**  
📍 Kotnikova ulica 28, 1000 Ljubljana, Slovenia  
📞 `+386 69 803 622` / `+386 70 447 982`  
✉️ `info.williamconstruction@gmail.com`  
🌐 [https://williamsconstruction.si](https://williamsconstruction.si)

---

<div align="center">
<sub>Maintained for <strong>Williams Constructions</strong> &bull; Built with React, Vite SSG &amp; Core PHP</sub>
</div>
