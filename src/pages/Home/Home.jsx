// src/pages/Home/Home.jsx
import React from 'react';
import SEO from '../../components/SEO/SEO';
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
    '@type': 'LocalBusiness',
    name: 'Williams Services & Williams Constructions',
    image: 'https://thewilliamsconstructions.com/favicon.svg',
    url: 'https://thewilliamsconstructions.com',
    telephone: '+38669803622',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kotnikova ulica 28',
      addressLocality: 'Ljubljana',
      postalCode: '1000',
      addressCountry: 'SI'
    },
    description: 'Specializirani izvajalec za zagotavljanje delovne sile v Sloveniji z usposobljenimi varilci, zidarji, strojniki mehanizacije in gradbenimi delavci.',
    founder: {
      '@type': 'Person',
      name: 'Toushif Williams'
    }
  };

  return (
    <div className="home-page">
      <SEO
        title="Gradbena delovna sila in tehnični kader v Sloveniji"
        description="Williams Constructions zagotavlja certificirane varilce (TIG, MIG/MAG), usposobljene zidarje, strojnike težke gradbene mehanizacije in zanesljivo delovno silo po vsej Sloveniji."
        canonical="/"
        schemaData={homeSchema}
      />

      {/* SECTION 1: Hero Carousel */}
      <Hero />

      {/* SECTION 2: About Williams Services (Preview Variant) */}
      <About variant="preview" />

      {/* SECTION 3: Our Services (Preview Variant) */}
      <Services variant="preview" />

      {/* SECTION 4: Compliance & Documentation Handled End-to-End */}
      <Compliance />

      {/* SECTION 5: Industries We Serve (Preview Variant) */}
      <Industries variant="preview" />

      {/* SECTION 6: How We Work (Preview Variant) */}
      <HowWeWork variant="preview" />

      {/* SECTION 7: Why Do Companies Choose Us? */}
      <WhyChooseUs />

      {/* SECTION 8: Appointment / Request Workforce Form */}
      <Appointment />
    </div>
  );
};

export default Home;
