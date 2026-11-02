// src/pages/About/AboutPage.jsx
import React from 'react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import About from '../Home/sections/About/About';
import Compliance from '../Home/sections/Compliance/Compliance';
import WhyChooseUs from '../Home/sections/WhyChooseUs/WhyChooseUs';
import Appointment from '../Home/sections/Appointment/Appointment';
import './AboutPage.css';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <SEO
        title="O nas - Zidarstvo, delovna sila in tehnični kader v Sloveniji"
        description="Spoznajte Williams Services in Williams Constructions, ki ga vodi Toushif Williams. Neposredno terensko vodenje, slovenska zakonodajna skladnost in usposobljeni gradbeni mojstri."
        canonical="/about"
      />

      <PageHero
        badge="Pregled podjetja"
        title="O podjetju Williams Services"
        subtitle="Povezujemo praktične izkušnje z gradbišč z zanesljivim zaposlovanjem mednarodne delovne sile in preglednim vodenjem v Sloveniji."
        breadcrumbs={[{ label: 'O nas' }]}
      />

      {/* Reusable About Section in FULL variant */}
      <About variant="full" />

      {/* Compliance Overview */}
      <Compliance />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Direct Workforce Request */}
      <Appointment />
    </div>
  );
};

export default AboutPage;
