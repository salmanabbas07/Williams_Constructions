// src/pages/Home/Home.jsx
import React from 'react';
import SEO, { SITE_URL } from '../../components/SEO/SEO';
import { companyContact } from '../../data/navigationData';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Services from './sections/Services/Services';
import Compliance from './sections/Compliance/Compliance';
import Industries from './sections/Industries/Industries';
import HowWeWork from './sections/HowWeWork/HowWeWork';
import WhyChooseUs from './sections/WhyChooseUs/WhyChooseUs';
import Appointment from './sections/Appointment/Appointment';
import './Home.css';

export const Home = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Williams Services & Williams Constructions',
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/newLOGO.png`
        },
        email: companyContact.email,
        telephone: '+38669803622',
        founder: {
          '@type': 'Person',
          name: companyContact.founder
        },
        sameAs: [
          companyContact.socials.facebook,
          companyContact.socials.instagram
        ]
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'Williams Services & Williams Constructions',
        image: `${SITE_URL}/og-image.jpg`,
        url: `${SITE_URL}/`,
        telephone: '+38669803622',
        email: companyContact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Kotnikova ulica 28',
          addressLocality: 'Ljubljana',
          postalCode: '1000',
          addressCountry: 'SI'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Slovenia'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:00',
            closes: '18:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '08:00',
            closes: '14:00'
          }
        ],
        description: 'Specializirani izvajalec za zagotavljanje delovne sile v Sloveniji z usposobljenimi varilci, zidarji, strojniki mehanizacije in gradbenimi delavci.',
        founder: {
          '@type': 'Person',
          name: companyContact.founder
        },
        parentOrganization: {
          '@id': `${SITE_URL}/#organization`
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Williams Constructions',
        inLanguage: 'sl-SI',
        publisher: {
          '@id': `${SITE_URL}/#organization`
        }
      }
    ]
  };

  return (
    <div className="home-page">
      <SEO
        title="Williams Constructions | Gradbena delovna sila Slovenija"
        description="Williams Constructions zagotavlja certificirane varilce, zidarje in strojnike težke gradbene mehanizacije s popolno pravno skladnostjo po vsej Sloveniji."
        canonical="/"
        schemaData={homeSchema}
      />

      {/* SECTION 1: Hero Carousel */}
      <Hero />

      {/* SECTION 2: About Williams Services (Preview Variant) */}
      <About variant="preview" />

      {/* SECTION 3: Our Services (Preview Variant) */}
      <Services variant="preview" />

      {/* SECTION 3: How We Work (Preview Variant) */}
      <HowWeWork variant="preview" />

      {/* SECTION 4: Compliance & Documentation Handled End-to-End */}
      {/* <Compliance /> */}

      {/* SECTION 5: Industries We Serve (Preview Variant) */}
      <Industries variant="preview" />

      

      {/* SECTION 6: Why Do Companies Choose Us? */}
      <WhyChooseUs />

      {/* SECTION 7: Appointment / Request Workforce Form */}
      {/* <Appointment /> */}
    </div>
  );
};

export default Home;
