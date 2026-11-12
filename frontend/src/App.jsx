// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import { blogData } from './data/blogData';

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

function lazyWithPreload(factory) {
  let LoadedComponent = null;
  const load = () =>
    factory().then((mod) => {
      LoadedComponent = mod.default;
      return mod;
    });
  const LazyComponent = lazy(load);
  const PreloadableComponent = (props) =>
    LoadedComponent ? <LoadedComponent {...props} /> : <LazyComponent {...props} />;
  PreloadableComponent.preload = load;
  return PreloadableComponent;
}

// Route-based Code Splitting (Lazy Loading) for Inner Pages
const AboutPage = lazyWithPreload(() => import('./pages/About/AboutPage'));
const ServicesPage = lazyWithPreload(() => import('./pages/Services/ServicesPage'));
const IndustriesPage = lazyWithPreload(() => import('./pages/Industries/IndustriesPage'));
const HowWeWorkPage = lazyWithPreload(() => import('./pages/HowWeWork/HowWeWorkPage'));
const BlogPage = lazyWithPreload(() => import('./pages/Blog/BlogPage'));
const FAQPage = lazyWithPreload(() => import('./pages/FAQ/FAQPage'));
const ContactPage = lazyWithPreload(() => import('./pages/Contact/ContactPage'));
const PrivacyPolicyPage = lazyWithPreload(() => import('./pages/PrivacyPolicy/PrivacyPolicyPage'));
const NotFoundPage = lazyWithPreload(() => import('./pages/NotFound/NotFoundPage'));

const routePreloaders = {
  '/about': AboutPage.preload,
  '/services': ServicesPage.preload,
  '/projects': IndustriesPage.preload,
  '/industries': IndustriesPage.preload,
  '/how-we-work': HowWeWorkPage.preload,
  '/blog': BlogPage.preload,
  '/faq': FAQPage.preload,
  '/pogosta-vprasanja': FAQPage.preload,
  '/contact': ContactPage.preload,
  '/privacy-policy': PrivacyPolicyPage.preload,
};

export const preloadRoute = (pathname) => {
  const normalized = decodeURIComponent(pathname || '/').replace(/\/+$/, '') || '/';
  if (normalized === '/Pogosta vprašanja') return routePreloaders['/faq']();
  if (normalized.startsWith('/blog/')) {
    const slug = normalized.slice('/blog/'.length);
    const hasPost = blogData.some((post) => post.slug === slug);
    return hasPost ? BlogPage.preload() : NotFoundPage.preload();
  }
  const loader = routePreloaders[normalized];
  return loader ? loader() : NotFoundPage.preload();
};

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
      <LazyMotion features={domAnimation}>
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
                  <Route path="/blog/:slug" element={<BlogPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/pogosta-vprasanja" element={<FAQPage />} />
                  <Route path="/Pogosta vprašanja" element={<FAQPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;
