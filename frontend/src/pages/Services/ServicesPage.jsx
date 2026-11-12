// src/pages/Services/ServicesPage.jsx
import React from 'react';
import SEO, { SITE_URL, buildBreadcrumbSchema } from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import Services from '../Home/sections/Services/Services';
import Compliance from '../Home/sections/Compliance/Compliance';
import Appointment from '../Home/sections/Appointment/Appointment';
import { servicesData } from '../../data/servicesData';
import './ServicesPage.css';

export const ServicesPage = () => {
  const servicesSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Gradbene in tehnične storitve – Williams Constructions',
      url: `${SITE_URL}/services`,
      itemListElement: servicesData.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          url: `${SITE_URL}/services#${service.id}`,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Williams Services & Williams Constructions',
            url: `${SITE_URL}/`
          },
          areaServed: {
            '@type': 'Country',
            name: 'Slovenia'
          }
        }
      }))
    },
    buildBreadcrumbSchema([
      { label: 'Domov', path: '/' },
      { label: 'Storitve', path: '/services' }
    ])
  ];

  return (
    <div className="services-page">
      <SEO
        title="Gradbene storitve in varilci | Williams Constructions"
        description="Certificirani varilci TIG/MIG, izkušeni zidarji, upravljavci težke mehanizacije in gradbeni delavci z urejenimi dovoljenji za podjetja po vsej Sloveniji."
        canonical="/services"
        schemaData={servicesSchema}
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
