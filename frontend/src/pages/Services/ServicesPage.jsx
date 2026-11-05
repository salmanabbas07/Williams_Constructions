// src/pages/Services/ServicesPage.jsx
import React from 'react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import Services from '../Home/sections/Services/Services';
import Compliance from '../Home/sections/Compliance/Compliance';
import Appointment from '../Home/sections/Appointment/Appointment';
import './ServicesPage.css';

export const ServicesPage = () => {
  return (
    <div className="services-page">
      <SEO
        title="Storitve - Gradbena dela, varilci in upravljavci mehanizacije v Sloveniji"
        description="Oglejte si obsežne storitve Williams Constructions: Zidarstvo, TIG/MIG varilci, upravljavci bagrov, podizvajalstvo in usposobljena gradbena delovna sila po vsej Sloveniji."
        canonical="/services"
      />

      <PageHero
        src="/images/service-banner.webp"
        badge="Profili in kadrovske zmogljivosti"
        title="Gradbene in tehnične storitve"
        subtitle="Celovite kadrovske rešitve po vsej Sloveniji. Popolnoma dokumentirani, varnostno usposobljeni in vodeni delavci za maksimalno produktivnost."
        breadcrumbs={[{ label: 'Storitve' }]}
      />

      {/* Reusable Services Section in FULL variant */}
      <Services variant="full" />

      {/* Compliance Block */}
      <Compliance />

      {/* Appointment / Workforce Request Form */}
      <Appointment />
    </div>
  );
};

export default ServicesPage;
