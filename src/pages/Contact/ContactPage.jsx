// src/pages/Contact/ContactPage.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import Appointment from '../Home/sections/Appointment/Appointment';
import { companyContact } from '../../data/navigationData';
import './ContactPage.css';

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || searchParams.get('industry') || '';

  return (
    <div className="contact-page">
      <SEO
        title="Kontakt - Williams Services & Constructions Ljubljana, Slovenija"
        description="Stopite v stik z Williams Constructions v Ljubljani. Pokličite +386 69 803 622 ali oddajte spletno povpraševanje za gradbeno delovno silo, varilce in zidarje."
        canonical="/contact"
      />

      <PageHero
        badge="Stopite v stik"
        title="Kontaktirajte Williams Constructions"
        subtitle="Stopite v neposreden stik z našo slovensko ekipo glede zagotavljanja delavcev na gradbišču, zidarskega podizvajalstva ali specializiranih varilskih del."
        breadcrumbs={[{ label: 'Kontakt' }]}
      />

      {/* Contact Channels Grid */}
      <div className="contact-info-section section-py bg-light">
        <div className="container">
          <div className="contact-cards-grid">
            {/* Card 1: Office Address */}
            <div className="contact-feature-card">
              <div className="contact-feature-icon">
                <MapPin size={24} />
              </div>
              <h3 className="feature-title">Sedež podjetja</h3>
              <p className="feature-detail">{companyContact.address}</p>
              <span className="feature-sub">Ljubljana – Poslovno središče</span>
            </div>

            {/* Card 2: Phone */}
            <div className="contact-feature-card">
              <div className="contact-feature-icon">
                <Phone size={24} />
              </div>
              <h3 className="feature-title">Telefonske številke</h3>
              <div className="phone-links-group">
                {companyContact.phones.map((phone) => (
                  <a key={phone.display} href={phone.link} className="contact-phone-item">
                    {phone.display}
                  </a>
                ))}
              </div>
              <span className="feature-sub">Neposredna linija do vodstva in dispečerja</span>
            </div>

            {/* Card 3: Email */}
            <div className="contact-feature-card">
              <div className="contact-feature-icon">
                <Mail size={24} />
              </div>
              <h3 className="feature-title">E-poštna povpraševanja</h3>
              <a href={`mailto:${companyContact.email}`} className="contact-email-item">
                {companyContact.email}
              </a>
              <span className="feature-sub">Odgovorimo v roku 24 delovnih ur</span>
            </div>

            {/* Card 4: Working Hours */}
            <div className="contact-feature-card">
              <div className="contact-feature-icon">
                <Clock size={24} />
              </div>
              <h3 className="feature-title">Delovni čas</h3>
              <p className="feature-detail">{companyContact.workingHours}</p>
              <span className="feature-sub highlight-gold">24/7 Terensko usklajevanje na gradbišču</span>
            </div>
          </div>
        </div>
      </div>

      {/* Office Location Map Preview Placeholder */}
      <div className="office-map-section container">
        <div className="map-placeholder-card">
          <div className="map-pattern-bg" />
          <div className="map-card-content">
            <div className="map-pin-pulse">
              <MapPin size={32} className="map-pin-icon" />
            </div>
            <h4>Williams Services d.o.o.</h4>
            <p>Kotnikova ulica 28, 1000 Ljubljana, Slovenija</p>
            <a 
              href="https://maps.google.com/?q=Kotnikova+ulica+28+1000+Ljubljana+Slovenia"
              target="_blank" 
              rel="noopener noreferrer"
              className="map-external-link"
            >
              <span>Odpri v Google Zemljevidih</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Appointment & Workforce Request Form */}
      <Appointment 
        initialService={preselectedService} 
        isContactPage={true} 
      />
    </div>
  );
};

export default ContactPage;
