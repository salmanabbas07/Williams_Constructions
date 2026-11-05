// src/pages/Industries/IndustriesPage.jsx
import React from 'react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import Industries from '../Home/sections/Industries/Industries';
import WhyChooseUs from '../Home/sections/WhyChooseUs/WhyChooseUs';
import Appointment from '../Home/sections/Appointment/Appointment';
import './IndustriesPage.css';

export const IndustriesPage = () => {
  return (
    <div className="industries-page">
      <SEO
        title="Projekti in panoge - Gradbeništvo, infrastruktura, logistika in proizvodnja v Sloveniji"
        description="Williams Constructions zagotavlja preverjeno delovno silo za stanovanjsko gradnjo, nizke gradnje, varilske delavnice, tovorni promet in proizvodnjo po vsej Sloveniji."
        canonical="/projects"
      />

      <PageHero
        src="/images/project-banner.webp"
        badge="Ključni gospodarski sektorji"
        title="Projekti in panoge, ki jim nudimo podporo"
        subtitle="Od večjih prometnih infrastrukturnih projektov in visokih gradenj do industrijskih obratov ter sodobnih logističnih centrov v Sloveniji."
        breadcrumbs={[{ label: 'Projekti' }]}
      />

      {/* Reusable Industries Section in FULL variant */}
      <Industries variant="full" />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Direct Workforce Request Form */}
      <Appointment />
    </div>
  );
};

export default IndustriesPage;
