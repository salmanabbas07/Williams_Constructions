// src/pages/About/AboutPage.jsx
import React from 'react';
import SEO, { SITE_URL, buildBreadcrumbSchema } from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import About from '../Home/sections/About/About';
import Compliance from '../Home/sections/Compliance/Compliance';
import WhyChooseUs from '../Home/sections/WhyChooseUs/WhyChooseUs';
import Appointment from '../Home/sections/Appointment/Appointment';
import './AboutPage.css';

export const AboutPage = () => {
  const aboutSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'O podjetju Williams Constructions | Gradbeni partner',
      url: `${SITE_URL}/about`,
      description:
        'Spoznajte Williams Constructions, zaupanja vrednega partnerja za certificirano gradbeno delovno silo, tehnični kader in celovite gradbene storitve v Sloveniji.',
      isPartOf: {
        '@id': `${SITE_URL}/#website`
      }
    },
    buildBreadcrumbSchema([
      { label: 'Domov', path: '/' },
      { label: 'O nas', path: '/about' }
    ])
  ];

  return (
    <div className="about-page">
      <SEO
        title="O podjetju Williams Constructions | Gradbeni partner"
        description="Spoznajte Williams Constructions, zaupanja vrednega partnerja za certificirano gradbeno delovno silo, tehnični kader in celovite gradbene storitve v Sloveniji."
        canonical="/about"
        schemaData={aboutSchema}
      />

      <PageHero
        src="/images/about-banner.webp"
        badge="O nas"
        title="O nas – Williams Constructions"
        subtitle="Dobrodošli pri Williams Constructions, vašem zaupanja vrednem partnerju na področju gradbeništva in celovitih gradbenih storitev. Že vrsto let gradimo z vizijo, natančnostjo in nepopustljivo predanostjo kakovosti."
        breadcrumbs={[{ label: 'O nas' }]}
      />

      {/* Reusable About Section in FULL variant */}
      <About variant="full" />

      {/* Compliance Overview */}
      <Compliance />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Direct Workforce Request */}
      {/* <Appointment /> */}
    </div>
  );
};

export default AboutPage;
