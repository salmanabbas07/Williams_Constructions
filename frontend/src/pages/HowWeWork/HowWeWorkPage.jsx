// src/pages/HowWeWork/HowWeWorkPage.jsx
import React from 'react';
import SEO, { SITE_URL, buildBreadcrumbSchema } from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import HowWeWork from '../Home/sections/HowWeWork/HowWeWork';
import Compliance from '../Home/sections/Compliance/Compliance';
import Appointment from '../Home/sections/Appointment/Appointment';
import './HowWeWorkPage.css';

export const HowWeWorkPage = () => {
  const howWeWorkSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Kako delamo – Napotitev kadra | Williams Constructions',
      url: `${SITE_URL}/how-we-work`,
      description:
        'Spoznajte naš 6-stopenjski postopek izbire, urejanja delovnih dovoljenj, uvajanja in vodenja gradbenih delavcev za zanesljivo delo na vaših projektih.'
    },
    buildBreadcrumbSchema([
      { label: 'Domov', path: '/' },
      { label: 'Kako delamo', path: '/how-we-work' }
    ])
  ];

  return (
    <div className="how-we-work-page">
      <SEO
        title="Kako delamo – Napotitev kadra | Williams Constructions"
        description="Spoznajte naš 6-stopenjski postopek izbire, urejanja delovnih dovoljenj, uvajanja in vodenja gradbenih delavcev za zanesljivo delo na vaših projektih."
        canonical="/how-we-work"
        schemaData={howWeWorkSchema}
      />

      <PageHero
        badge="Postopek zaposlovanja in napotitve"
        title="Naš 6-stopenjski model zagotavljanja delovne sile"
        subtitle="Pregleden in pravno zanesljiv sistem, ki zagotavlja prihod usposobljenih delavcev na vaše gradbišče, pripravljenih na varno in učinkovito delo od prvega dne."
        breadcrumbs={[{ label: 'Kako delamo' }]}
      />

      {/* Reusable HowWeWork Section in FULL variant */}
      <HowWeWork variant="full" />

      {/* Compliance Overview */}
      <Compliance />

      {/* Direct Workforce Request Form */}
      <Appointment />
    </div>
  );
};

export default HowWeWorkPage;
