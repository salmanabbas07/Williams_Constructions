// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Global Styles
import './styles/variables.css';
import './styles/global.css';
import './styles/responsive.css';

// Reusable Shared Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Immediate load for the landing page
import Home from './pages/Home/Home';

// Route-based Code Splitting (Lazy Loading) for Inner Pages
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));
const IndustriesPage = lazy(() => import('./pages/Industries/IndustriesPage'));
const HowWeWorkPage = lazy(() => import('./pages/HowWeWork/HowWeWorkPage'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));

// Elegant Minimalist Fallback for Lazy Chunks
const PageLoader = () => (
  <div 
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      backgroundColor: 'var(--light-bg)'
    }}
    aria-label="Nalaganje strani"
  >
    <div 
      style={{
        width: '42px',
        height: '42px',
        border: '3px solid rgba(2, 43, 88, 0.1)',
        borderTopColor: 'var(--primary-gold)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }} 
    />
    <span style={{ fontSize: '0.85rem', color: 'var(--slate-blue)', fontWeight: 600 }}>
      Nalaganje Williams Constructions...
    </span>
  </div>
);

export const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="app-shell">
          <Header />
          <main id="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/projects" element={<IndustriesPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/how-we-work" element={<HowWeWorkPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
