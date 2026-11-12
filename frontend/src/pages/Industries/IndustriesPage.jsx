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
        title="Projekti in gradbene panoge | Williams Constructions"
        description="Zagotavljamo preverjeno delovno silo za visoke in nizke gradnje, infrastrukturo, varilske delavnice, logistiko ter industrijsko proizvodnjo po Sloveniji."
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
