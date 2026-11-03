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
        title="O nas – Williams Construction"
        description="Dobrodošli pri William Construction, vašem zaupanja vrednem partnerju na področju gradbeništva in celovitih gradbenih storitev. Že vrsto let gradimo z vizijo, natančnostjo in nepopustljivo predanostjo kakovosti."
        canonical="/about"
      />

      <PageHero
        src="/images/about-banner.webp"
        alt="Williams Construction - O nas"
        badge="O nas"
        title="O nas – Williams Construction"
        subtitle="Dobrodošli pri William Construction, vašem zaupanja vrednem partnerju na področju gradbeništva in celovitih gradbenih storitev. Že vrsto let gradimo z vizijo, natančnostjo in nepopustljivo predanostjo kakovosti."
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
