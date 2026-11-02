// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { 
  LinkedinIcon, 
  FacebookIcon, 
  InstagramIcon, 
  WhatsAppIcon 
} from '../Icons/SocialIcons';
import { companyContact } from '../../data/navigationData';
import { servicesData } from '../../data/servicesData';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Pre-footer Callout Banner */}
      <div className="footer-callout">
        <div className="container footer-callout-inner">
          <div className="callout-text">
            <span className="callout-badge">
              <ShieldCheck size={16} /> Popolnoma dokumentirana slovenska delovna sila
            </span>
            <h3 className="callout-title">Potrebujete zanesljivo delovno silo na gradbišču ta teden?</h3>
            <p className="callout-subtitle">
              Stopite v neposreden stik z našo slovensko koordinacijsko ekipo za hitro in zakonsko skladno napotitev delavcev.
            </p>
          </div>
          <div className="callout-actions">
            <Link to="/contact" className="callout-cta-btn">
              <span>Zahtevajte delovno silo zdaj</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Williams Services */}
            <div className="footer-col footer-col-brand">
              <Link to="/" className="footer-logo" aria-label="Williams Constructions Domov">
                <img 
                  src="/images/WILLIAMS%20CONSTRUCTIONS%20GROUP%20LOGO.jpg" 
                  alt="Williams Constructions Group" 
                  className="footer-brand-logo"
                />
              </Link>

              <p className="footer-about-text">
                Zagotavljamo popolnoma dokumentirane, zdravstveno pregledane in strokovno pripravljene delavce za gradbene, logistične ter industrijske projekte po vsej Sloveniji, z nemoteno koordinacijo od povpraševanja do napotitve.
              </p>

              <div className="footer-social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Williams na LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Williams na Facebook">
                  <FacebookIcon size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Williams na Instagram">
                  <InstagramIcon size={18} />
                </a>
                <a href="https://wa.me/38669803622" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Sporočilo prek WhatsApp">
                  <WhatsAppIcon size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Hitre povezave</h4>
              <ul className="footer-link-list">
                <li>
                  <Link to="/about" className="footer-link">
                    <ArrowRight size={14} className="link-arrow" /> O nas
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="footer-link">
                    <ArrowRight size={14} className="link-arrow" /> Projekti
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="footer-link">
                    <ArrowRight size={14} className="link-arrow" /> Blog in novice
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="footer-link">
                    <ArrowRight size={14} className="link-arrow" /> FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    <ArrowRight size={14} className="link-arrow" /> Kontakt
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="footer-link">
                    <ArrowRight size={14} className="link-arrow" /> Politika zasebnosti
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="footer-col">
              <h4 className="footer-col-title">Naše storitve</h4>
              <ul className="footer-link-list">
                {servicesData.map((service) => (
                  <li key={service.id}>
                    <Link to={`/services#${service.id}`} className="footer-link">
                      <ArrowRight size={14} className="link-arrow" /> {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get In Touch */}
            <div className="footer-col footer-col-contact">
              <h4 className="footer-col-title">Stopite v stik</h4>
              
              <div className="footer-contact-items">
                <div className="footer-contact-row">
                  <div className="contact-icon-wrap">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Sedež podjetja:</span>
                    <p className="contact-val">{companyContact.address}</p>
                  </div>
                </div>

                <div className="footer-contact-row">
                  <div className="contact-icon-wrap">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Telefonska podpora:</span>
                    {companyContact.phones.map((phone) => (
                      <a key={phone.display} href={phone.link} className="contact-phone-link">
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="footer-contact-row">
                  <div className="contact-icon-wrap">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="contact-label">Pišite nam:</span>
                    <a href={`mailto:${companyContact.email}`} className="contact-val contact-mail-link">
                      {companyContact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            © {currentYear} Williams Services / Williams Constructions. Vse pravice pridržane.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy" className="bottom-link">Politika zasebnosti</Link>
            <span className="bottom-divider">|</span>
            <Link to="/contact" className="bottom-link">Ljubljana, Slovenija</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
