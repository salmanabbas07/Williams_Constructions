// src/pages/FAQ/FAQPage.jsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Mail, MessageSquare } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Button from '../../components/Button/Button';
import { faqData } from '../../data/faqData';
import { companyContact } from '../../data/navigationData';
import './FAQPage.css';

export const FAQPage = () => {
  const [openItems, setOpenItems] = useState({ 1: true }); // Open first question by default

  const toggleAccordion = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <div className="faq-page">
      <SEO
        title="Pogosta vprašanja - Delovna dovoljenja in gradbena delovna sila v Sloveniji"
        description="Poiščite odgovore na pogosta vprašanja glede delovnih dovoljenj, rokov napotitve, certifikatov varilcev in dvojezičnega vodenja z Williams Services."
        canonical="/faq"
        schemaData={faqSchema}
      />

      <PageHero
        badge="Pogosta vprašanja"
        title="Odgovori in pojasnila"
        subtitle="Jasni odgovori o napotitvi delavcev, enotnih delovnih dovoljenjih v Sloveniji, preverjanju znanj in pogodbenih jamstvih."
        breadcrumbs={[{ label: 'Pogosta vprašanja' }]}
      />

      <div className="faq-content-section section-py bg-light">
        <div className="container">
          <div className="faq-layout">
            {/* Main Accordion Column */}
            <div className="faq-accordion-col">
              <SectionTitle
                badge="Center za pomoč"
                title="Pogosta vprašanja naročnikov"
                subtitle="Kliknite na posamezno vprašanje za podrobna pojasnila o naših postopkih zaposlovanja in napotitve."
                align="left"
              />

              <div className="accordion-list">
                {faqData.map((item) => {
                  const isOpen = Boolean(openItems[item.id]);

                  return (
                    <div 
                      key={item.id} 
                      className={`accordion-item ${isOpen ? 'open' : ''}`}
                    >
                      <button
                        type="button"
                        className="accordion-trigger"
                        onClick={() => toggleAccordion(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <span className="accordion-question">
                          {item.question}
                        </span>
                        <div className="accordion-icon-wrap">
                          <ChevronDown size={18} className={`accordion-chevron ${isOpen ? 'rotate' : ''}`} />
                        </div>
                      </button>

                      <div
                        id={`faq-answer-${item.id}`}
                        className={`accordion-collapse ${isOpen ? 'show' : ''}`}
                        role="region"
                      >
                        <div className="accordion-body">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Editable Placeholder Note as required in PRD Section 7 */}
              <div className="faq-editable-notice">
                <HelpCircle size={18} className="notice-icon" />
                <span>
                  <strong>Imate vprašanje glede specifičnega projekta?</strong> Dodatna tehnična vprašanja je mogoče neposredno prilagoditi ali dodati v <code>src/data/faqData.js</code>.
                </span>
              </div>
            </div>

            {/* Side Assistance Card */}
            <div className="faq-side-col">
              <div className="assistance-card">
                <div className="assistance-icon-box">
                  <MessageSquare size={28} />
                </div>
                <h3 className="assistance-title">Imate vprašanje, ki ni navedeno tukaj?</h3>
                <p className="assistance-text">
                  Naša vodstvena ekipa se z veseljem pogovori o vaših specifičnih zahtevah na gradbišču, posebnih izmenah ali kadrovskih kvotah.
                </p>

                <div className="assistance-contact-methods">
                  <a href={`tel:${companyContact.phones[0].display.replace(/\s+/g, '')}`} className="assistance-link">
                    <PhoneCall size={16} />
                    <span>{companyContact.phones[0].display}</span>
                  </a>
                  <a href={`mailto:${companyContact.email}`} className="assistance-link">
                    <Mail size={16} />
                    <span>{companyContact.email}</span>
                  </a>
                </div>

                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  className="w-100"
                >
                  Stopite v neposreden stik z nami
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
