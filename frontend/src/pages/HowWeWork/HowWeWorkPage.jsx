// src/pages/HowWeWork/HowWeWorkPage.jsx
import React from 'react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import HowWeWork from '../Home/sections/HowWeWork/HowWeWork';
import Compliance from '../Home/sections/Compliance/Compliance';
import Appointment from '../Home/sections/Appointment/Appointment';
import './HowWeWorkPage.css';

export const HowWeWorkPage = () => {
  return (
    <div className="how-we-work-page">
      <SEO
        title="Kako delamo – Napotitev kadra | Williams Constructions"
        description="Spoznajte naš 6-stopenjski postopek izbire, urejanja delovnih dovoljenj, uvajanja in vodenja gradbenih delavcev za zanesljivo delo na vaših projektih."
        canonical="/how-we-work"
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
