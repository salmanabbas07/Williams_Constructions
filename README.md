# Williams Constructions

> A modern, premium, and fully responsive construction workforce and manpower services website developed using React.js and Vite.

Official Reference Website: [https://thewilliamsconstructions.com/](https://thewilliamsconstructions.com/)

---

## 1. Project Overview

**Williams Constructions** (operated by Williams Services d.o.o., based in Ljubljana, Slovenia) specializes in supplying certified welding and fabrication tradesmen (TIG, MIG/MAG), skilled heavy machinery operators (excavators, loaders, cranes), masonry project contracting, and compliant construction manpower across Slovenia.

This web application delivers a clean, high-performance digital presence designed with architectural elegance, smooth Swiper.js carousels, subtle Framer Motion scroll animations, and an intuitive component-based architecture.

---

## 2. Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React.js 19** | Component-driven frontend architecture |
| **Vite** | Modern, ultra-fast development environment and production bundler |
| **JavaScript (JSX)** | Clean, modern ES6+ component logic (No TypeScript) |
| **CSS3** | Modular custom styling with CSS variables and responsive design |
| **React Router DOM v7** | Single Page Application (SPA) declarative client-side routing |
| **Framer Motion** | Restrained, professional scroll entrance and transition animations |
| **Swiper.js** | Modern touch-enabled hero carousel with fade transitions |
| **Lucide React** | Consistent, modern vector iconography |
| **React Helmet Async** | Dynamic head metadata and Open Graph / Twitter Card SEO tags |

---

## 3. Core Features

- **Architectural Color Identity**: Dominant clean white/light background with authoritative Dark Navy (`#022B58`), Primary Gold highlights (`#DFA11A`), and Slate Blue typography (`#50647A`).
- **Default Language – Slovenian (Slovenščina)**: Entire visitor-facing experience (navigation, hero slides, service cards, compliance blocks, process steps, booking forms, validation errors, FAQs, blog articles, and privacy policy) is written in natural, professional Slovenian using correct diacritics (`č`, `š`, `ž`).
- **English Code Architecture**: Source code, components, file names, variables, and documentation strictly use clean English conventions.
- **Hero Carousel (Swiper.js)**: 3 rotating slides with dark overlay, custom pagination indicators, manual arrow navigation, and 5.5s autoplay with pause-on-hover.
- **Reusable Component Architecture**:
  - `About`: Configurable display mode via `variant="preview"` (Home) and `variant="full"` (About Us page).
  - `Services`: Shared data rendering 6 specialized trade cards with preview and full capability breakdowns.
  - `Industries`: 6 market sectors with role tags and inquiry links.
  - `How We Work`: 6-step interactive workflow timeline (horizontal on desktop, vertical on mobile).
  - `Appointment Form`: Validated workforce booking interface with isolated API service integration.
  - `ImagePlaceholder`: CSS blueprint-gradient image containers with correct aspect ratios, zero broken links, and instant drop-in replacement support for real photography.
- **Interactive FAQ Accordion**: Keyboard-friendly collapsible questions with ARIA attributes and category filtering.
- **Technical & On-Page SEO**: Canonical links, JSON-LD Schema (LocalBusiness & FAQPage), XML sitemap, `robots.txt`, and Open Graph tags.
- **Route-Level Code Splitting**: Dynamic lazy loading (`React.lazy` + `Suspense`) dividing inner pages into lightweight sub-bundles for optimal Core Web Vitals.

---

## 4. Project Folder Structure

```
williams-constructions/
├── public/
│   ├── favicon.svg             # Custom geometric brand mark
│   ├── robots.txt              # Search engine crawler instructions
│   └── sitemap.xml             # XML sitemap indexing all site routes
│
├── src/
│   ├── assets/                 # Brand assets and images
│   │
│   ├── components/             # Reusable shared components
│   │   ├── Button/             # Multi-variant button (primary, secondary, outline)
│   │   ├── Footer/             # 4-column footer with quick links & contact
│   │   ├── Header/             # Sticky navbar, top bar, & mobile drawer
│   │   ├── Icons/              # Social media vector icons (LinkedIn, FB, IG, WA)
│   │   ├── ImagePlaceholder/   # Modern CSS blueprint placeholder with fallbacks
│   │   ├── Motion/             # Framer Motion scroll animation wrappers (FadeIn)
│   │   ├── PageHero/           # Inner page hero banner with breadcrumbs
│   │   ├── ScrollToTop/        # Route change scroll reset handler
│   │   ├── SectionTitle/       # Section title header with architectural divider
│   │   └── SEO/                # React Helmet Async metadata manager
│   │
│   ├── data/                   # Centralized single-source-of-truth datasets
│   │   ├── blogData.js         # Construction articles and insights
│   │   ├── complianceData.js   # 5 legal compliance & documentation blocks
│   │   ├── faqData.js          # Frequently asked questions dataset
│   │   ├── industriesData.js   # 6 client market industries
│   │   ├── navigationData.js   # Nav links, dropdowns, and company contact info
│   │   └── servicesData.js     # 6 trade workforce service definitions
│   │
│   ├── pages/
│   │   ├── About/              # About Us full page
│   │   ├── Blog/               # Blog listing & interactive reader modal
│   │   ├── Contact/            # Contact channels, headquarters map, & form
│   │   ├── FAQ/                # Accordion FAQ page
│   │   ├── HowWeWork/          # 6-Step process full page
│   │   ├── Industries/         # Industries full page
│   │   ├── NotFound/           # 404 error page
│   │   ├── PrivacyPolicy/      # GDPR & Slovenian privacy policy
│   │   ├── Services/           # Services full page
│   │   │
│   │   └── Home/               # Home page
│   │       ├── Home.jsx        # Section coordinator
│   │       ├── Home.css
│   │       └── sections/
│   │           ├── Hero/
│   │           ├── About/
│   │           ├── Services/
│   │           ├── Compliance/
│   │           ├── Industries/
│   │           ├── HowWeWork/
│   │           ├── WhyChooseUs/
│   │           └── Appointment/
│   │
│   ├── services/
│   │   └── appointmentService.js # Isolated API integration placeholder
│   │
│   ├── styles/
│   │   ├── variables.css       # Brand hex colors, typography, shadows, & radii
│   │   ├── global.css          # CSS resets, containers, and typography defaults
│   │   └── responsive.css      # Breakpoint overrides
│   │
│   ├── App.jsx                 # Route definitions & Suspense fallbacks
│   └── main.jsx                # React root mount
│
├── .gitignore                  # Git exclusion rules
├── index.html                  # HTML5 semantic shell & font imports
├── package.json                # Dependencies and project scripts
├── vite.config.js              # Vite bundler & manual chunk splitting
└── README.md                   # Complete project documentation
```

---

## 5. Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm (v9.0.0 or later)

### Steps

1. Clone or open the project directory:
   ```bash
   cd d:/wilma_construction
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 6. Development & Build Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) on port 3000 |
| `npm run build` | Builds the production-ready bundle with chunk optimization in the `dist/` directory |
| `npm run preview` | Serves the generated production build locally for verification |

---

## 7. SEO Implementation Details

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements.
- **Heading Hierarchy**: Exactly one `<h1>` per page with progressive `<h2>` and `<h3>` sub-sections.
- **Dynamic Head Metadata**: Every page configures custom title tags, meta descriptions, canonical URLs, and Open Graph card properties via `react-helmet-async`.
- **Structured Data (JSON-LD)**:
  - Homepage: `LocalBusiness` schema with address in Ljubljana, Slovenia, phone, and founder information.
  - FAQ Page: `FAQPage` schema mapping all questions and answers for Google Rich Results.
- **Robots & Sitemap**: `public/robots.txt` and `public/sitemap.xml` providing full crawlability for search engines.

---

## 8. Responsive Design & Breakpoints

The website has been styled with fluid typography (`clamp()`), CSS Grid, and Flexbox to deliver a seamless experience across all device viewports:

- **Desktop (1920px & 1440px)**: 3-column service/industry grids, full navigation bar with dropdown menus, horizontal process timeline.
- **Laptop (1280px)**: Container max-width scaling, comfortable padding.
- **Tablet (1024px & 768px)**: 2-column grids, collapsible service elements, compact contact layout.
- **Mobile (425px, 375px & 320px)**: 1-column responsive stacked cards, vertical process timeline, full-screen animated slide-in hamburger navigation drawer. Zero horizontal scroll overflow.

---

## 9. Future Backend Integration Guide

As required by the specification, no database or backend server is connected during this frontend development phase.

The appointment and workforce inquiry forms are fully isolated within:
```
src/services/appointmentService.js
```

### How to Connect a Backend API Later:
1. Open `src/services/appointmentService.js`.
2. Replace the simulated asynchronous timeout with your live `fetch()` or `axios.post()` endpoint:
   ```javascript
   export const submitAppointmentRequest = async (formData) => {
     const response = await fetch('https://api.yourdomain.com/appointments', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
     });
     return await response.json();
   };
   ```
3. No changes to the UI components (`Appointment.jsx`, `ContactPage.jsx`) are required!

---

## 10. Developer & Business Information

- **Company**: Williams Services d.o.o. / Williams Constructions
- **Director**: Toushif Williams
- **Headquarters**: Kotnikova ulica 28, 1000 Ljubljana, Slovenia
- **Contact Email**: [info@wservicess.com](mailto:info@wservicess.com)
- **Phone Lines**: +386 69 803 622 | +386 70 447 982
- **Website**: [https://thewilliamsconstructions.com/](https://thewilliamsconstructions.com/)
