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
import SEO, { SITE_URL, buildBreadcrumbSchema } from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import Appointment from '../Home/sections/Appointment/Appointment';
import { companyContact } from '../../data/navigationData';
import './ContactPage.css';

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || searchParams.get('industry') || '';

  const contactSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Kontakt in povpraševanje | Williams Constructions SI',
      url: `${SITE_URL}/contact`,
      description:
        'Kontaktirajte Williams Constructions v Ljubljani na +386 69 803 622 za najem gradbenih delavcev, certificiranih varilcev, zidarjev in strojnikov.',
      mainEntity: {
        '@type': 'LocalBusiness',
        name: 'Williams Services & Williams Constructions',
        url: `${SITE_URL}/`,
        telephone: '+38669803622',
        email: companyContact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kotnikova ulica 28',
          addressLocality: 'Ljubljana',
          postalCode: '1000',
          addressCountry: 'SI'
        }
      }
    },
    buildBreadcrumbSchema([
      { label: 'Domov', path: '/' },
      { label: 'Kontakt', path: '/contact' }
    ])
  ];

  return (
    <div className="contact-page">
      <SEO
        title="Kontakt in povpraševanje | Williams Constructions SI"
        description="Kontaktirajte Williams Constructions v Ljubljani na +386 69 803 622 za najem gradbenih delavcev, certificiranih varilcev, zidarjev in strojnikov."
        canonical="/contact"
        schemaData={contactSchema}
      />

      <PageHero
        src="/images/contect-banner.webp"
        badge="Stopite v stik"
        title="Kontaktirajte Williams Constructions"
        subtitle="Stopite v neposreden stik z našo slovensko ekipo glede zagotavljanja delavcev na gradbišču, zidarskega podizvajalstva, strojnikov težke mehanizacije ali specializiranih varilskih del za projekte v Ljubljani, Mariboru, Celju, Kranju, Novem mestu, Kopru in po vsej Sloveniji."
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
              <h2 className="feature-title">Sedež podjetja</h2>
              <p className="feature-detail">{companyContact.address}</p>
              <span className="feature-sub">Ljubljana – Poslovno središče za osebne sestanke naročnikov, podpis pogodb o najemu ali podizvajanju delavne sile, vpogled v veljavne varilske ateste ter operativno usklajevanje napotitev za vsa slovenska gradbišča. Sprejemamo investitorje in glavne izvajalce iz Osrednjeslovenske, Podravske, Savinjske, Gorenjske, Dolenjske in Obalno-kraške regije vsak delovni dan.</span>
            </div>

            {/* Card 2: Phone */}
            <div className="contact-feature-card">
              <div className="contact-feature-icon">
                <Phone size={24} />
              </div>
              <h2 className="feature-title">Telefonske številke</h2>
              <div className="phone-links-group">
                {companyContact.phones.map((phone) => (
                  <a key={phone.display} href={phone.link} className="contact-phone-item">
                    {phone.display}
                  </a>
                ))}
              </div>
              <span className="feature-sub">Neposredna telefonska linija do vodstva podjetja in terenskega dispečerja za takojšnje informacije o razpoložljivih zidarjih, opažnih tesarjih, armiračih, varilcih TIG/MIG/MAG, ključavničarjih in strojnikih težke mehanizacije. Pokličite nas ob nujnih terminskih pospešitvah, izrednih remontih ali potrebi po hitri razširitvi obstoječe gradbene skupine kjerkoli v Sloveniji.</span>
            </div>

            {/* Card 3: Email */}
            <div className="contact-feature-card">
              <a href={`mailto:${companyContact.email}`} className="contact-feature-icon" aria-label="E-poštna povpraševanja">
                <Mail size={24} />
              </a>
              <h2 className="feature-title">E-poštna povpraševanja</h2>
              <a href={`mailto:${companyContact.email}`} className="contact-email-item">
                {companyContact.email}
              </a>
              <span className="feature-sub">Odgovorimo v roku 24 delovnih ur s konkretno oceno razpoložljivosti kadra, časovnico mobilizacije ter pregledno komercialno ponudbo. V sporočilo vključite vrsto del, število delavcev, zahtevane certifikate ISO 9606-1, lokacijo gradbišča in predviden začetek izvedbe, naši koordinatorji pa pripravijo natančen predlog napotitve in dokumentacije.</span>
            </div>

            {/* Card 4: Working Hours */}
            <div className="contact-feature-card">
              <div className="contact-feature-icon">
                <Clock size={24} />
              </div>
              <h2 className="feature-title">Delovni čas</h2>
              <p className="feature-detail">{companyContact.workingHours}</p>
              <span className="feature-sub highlight-gold">24/7 terensko usklajevanje na gradbišču za tekoče projekte, reševanje zastojev, sprotno spremljanje prisotnosti in nujne nadomestitve delavcev. Naši dvojezični koordinatorji zagotavljajo redno podporo vodjem del med enojnim ali dvoizmenskim delom, medtem ko pisarniška ekipa skrbi za pogodbeno inšpekcijsko dokumentacijo skozi celotno gradbeno sezono.</span>
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
            <h2>Williams Services d.o.o.</h2>
            <p>Kotnikova ulica 28, 1000 Ljubljana, Slovenija – Poslovna pisarna za osebni posvet z naročniki, pregled veljavne delovnopravne in varnostne dokumentacije delavcev (M-1, enotno dovoljenje, VZD, medicina dela) ter natančno načrtovanje stabilnih gradbenih, tesarskih, varilskih in strojniških ekip za projekte po vsej Sloveniji. Parkiranje za obiskovalce je urejeno v neposredni bližini poslovne stavbe ob predhodni najavi termina po telefonu ali preko spodnjega kontaktnega obrazca.</p>
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
