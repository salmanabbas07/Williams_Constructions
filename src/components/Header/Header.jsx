// src/components/Header/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { navLinks, companyContact } from '../../data/navigationData';
import Button from '../Button/Button';
import './Header.css';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 40;
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 40) {
            setIsScrolled(true);
          } else if (currentScrollY < 15) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* Top Bar for Contact & Direct Support */}
      <div className="header-topbar">
        <div className="container-wide header-topbar-inner">
          <div className="topbar-left">
            <span className="topbar-item">
              <MapPin size={14} className="topbar-icon" />
              <span>{companyContact.address}</span>
            </span>
            <span className="topbar-divider">|</span>
            <span className="topbar-item">
              <Clock size={14} className="topbar-icon" />
              <span>24/7 Koordinacija na gradbišču</span>
            </span>
          </div>

          <div className="topbar-right">
            <a href={`tel:${companyContact.phones[0].display.replace(/\s+/g, '')}`} className="topbar-link">
              <Phone size={14} className="topbar-icon" />
              <span>{companyContact.phones[0].display}</span>
            </a>
            <span className="topbar-divider">|</span>
            <a href={`mailto:${companyContact.email}`} className="topbar-link">
              <Mail size={14} className="topbar-icon" />
              <span>{companyContact.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="header-navbar">
        <div className="container-wide navbar-inner">
          {/* Logo */}
          <Link to="/" className="site-logo" aria-label="Williams Constructions Domov">
            <img 
              src="/images/WILLIAMSLOGO.png" 
              alt="Williams Constructions Group" 
              className="header-brand-logo"
            />
          </Link>

          {/* Desktop Nav Links (Centered) */}
          <div className="desktop-nav-center">
            <ul className="nav-menu">
              {navLinks.map((item) => {
                if (item.isDropdown) {
                  return (
                    <li 
                      key={item.label} 
                      className={`nav-item dropdown-item ${isServicesOpen ? 'active' : ''}`}
                      ref={dropdownRef}
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                      >
                        {item.label}
                        <ChevronDown size={15} className={`chevron-icon ${isServicesOpen ? 'rotate' : ''}`} />
                      </NavLink>

                      <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                        <div className="dropdown-header">
                          <span>Specializirane kadrovske rešitve</span>
                        </div>
                        <ul className="dropdown-list">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link 
                                to={child.path} 
                                className="dropdown-link"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                <span className="dropdown-bullet" />
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.label} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop CTA (Right) */}
          <div className="desktop-nav-right">
            <Button 
              to="/contact" 
              variant="primary" 
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              Zahtevajte delovno silo
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Zapri navigacijski meni' : 'Odpri navigacijski meni'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-inner">
          <ul className="mobile-nav-list">
            {navLinks.map((item) => {
              if (item.isDropdown) {
                return (
                  <li key={item.label} className="mobile-nav-item has-dropdown">
                    <div className="mobile-dropdown-header">
                      <Link 
                        to={item.path} 
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="mobile-dropdown-btn"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-label="Prikaži storitve"
                      >
                        <ChevronDown size={18} className={`chevron-icon ${mobileServicesOpen ? 'rotate' : ''}`} />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <ul className="mobile-sublist">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.path}
                              className="mobile-sublink"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.label} className="mobile-nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="mobile-drawer-cta">
            <Button
              to="/contact"
              variant="primary"
              size="md"
              icon={ArrowRight}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-100"
            >
              Zahtevajte delovno silo
            </Button>

            <div className="mobile-contact-block">
              <a href={`tel:${companyContact.phones[0].display.replace(/\s+/g, '')}`} className="mobile-contact-row">
                <Phone size={16} />
                <span>{companyContact.phones[0].display}</span>
              </a>
              <a href={`mailto:${companyContact.email}`} className="mobile-contact-row">
                <Mail size={16} />
                <span>{companyContact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
