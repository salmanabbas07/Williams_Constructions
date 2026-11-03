// src/pages/Home/sections/About/About.jsx
import React from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Users, 
  Briefcase,
  Quote
} from 'lucide-react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Button from '../../../../components/Button/Button';
import ImagePlaceholder from '../../../../components/ImagePlaceholder/ImagePlaceholder';
import FadeIn from '../../../../components/Motion/FadeIn';
import './About.css';

const BENEFIT_CARDS = [
  {
    id: 'expertise',
    title: 'Strokovnost in izkušnje',
    description: 'Naša ekipa izkušenih inženirjev, mojstrov in arhitektov vsakemu projektu pristopi z vrhunskim znanjem.',
    icon: Award
  },
  {
    id: 'comprehensive',
    title: 'Celovite storitve na enem mestu',
    description: 'Od prve ideje, načrtovanja, gradnje na ključ pa do pogodbene realizacije – prevzamemo celotno odgovornost.',
    icon: CheckCircle2
  },
  {
    id: 'quality',
    title: 'Brezkompromisna kakovost',
    description: 'Uporabljamo preverjene materiale in najsodobnejše gradbene tehnike, ki zagotavljajo dolgotrajnost in trdnost.',
    icon: ShieldCheck
  },
  {
    id: 'reliability',
    title: 'Zanesljivost in spoštovanje rokov',
    description: 'Vaš čas nam je dragocen, zato projekte vedno zaključimo v dogovorjenem roku in v okviru proračuna.',
    icon: Clock
  }
];

const EXTENDED_VALUES = [
  {
    title: 'Strokovnost in izkušnje',
    desc: 'Naša ekipa izkušenih inženirjev, mojstrov in arhitektov vsakemu projektu pristopi z vrhunskim znanjem.',
    icon: Award
  },
  {
    title: 'Celovite storitve na enem mestu',
    desc: 'Od prve ideje, načrtovanja, gradnje na ključ pa do pogodbene realizacije – prevzamemo celotno odgovornost.',
    icon: CheckCircle2
  },
  {
    title: 'Brezkompromisna kakovost',
    desc: 'Uporabljamo preverjene materiale in najsodobnejše gradbene tehnike, ki zagotavljajo dolgotrajnost in trdnost.',
    icon: ShieldCheck
  },
  {
    title: 'Zanesljivost in spoštovanje rokov',
    desc: 'Vaš čas nam je dragocen, zato projekte vedno zaključimo v dogovorjenem roku in v okviru proračuna.',
    icon: Clock
  }
];

export const About = ({ variant = 'preview' }) => {
  const isFull = variant === 'full';

  return (
    <section className={`about-section section-py ${isFull ? 'about-section-full' : ''}`} id="about-section">
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="O nas"
          title={isFull ? "Vaš zaupanja vreden partner v gradbeništvu" : "O nas – Williams Construction"}
          subtitle="Že vrsto let gradimo z vizijo, natančnostjo in nepopustljivo predanostjo kakovosti."
          align="left"
        />

        {/* Main Two-Column Layout */}
        <div className="about-grid">
          {/* Left Column: Visuals & Experience Badge */}
          <FadeIn direction="up" delay={0.1} className="about-visual-col">
            <div className="about-image-wrapper">
              <ImagePlaceholder
                src="/images/about-workforce-supervision.webp"
                alt="about-workforce-supervision.webp - about"
                aspectRatio="4/3"
                category="about"
                filename="about-workforce-supervision.jpg"
                caption="Celovite gradbene storitve in strokovno vodenje projektov"
                className="about-main-image"
              />

              {/* Floating Highlight Card */}
              <div className="about-experience-badge">
                <span className="exp-years">Williams</span>
                <span className="exp-label">Construction</span>
                <span className="exp-sub">Gradimo z vizijo in kakovostjo</span>
              </div>
            </div>

            {/* In full mode, show Director Quote Box */}
            {isFull && (
              <div className="director-quote-box">
                <Quote size={28} className="quote-icon" />
                <p className="director-quote-text">
                  "Pri William Construction verjamemo, da so trdni temelji osnova vsakega uspešnega sodelovanja. Zgradimo vašo prihodnost skupaj."
                </p>
                <div className="director-profile">
                  <strong>Williams Construction</strong>
                  <span>Zanesljiv partner v gradbeništvu</span>
                </div>
              </div>
            )}
          </FadeIn>

          {/* Right Column: Story & Narrative */}
          <FadeIn direction="up" delay={0.2} className="about-content-col">
            <div className="about-story-paragraphs">
              <p className="lead-paragraph">
                Dobrodošli pri <strong>William Construction</strong>, vašem zaupanja vrednem partnerju na področju gradbeništva in celovitih gradbenih storitev. Že vrsto let gradimo z vizijo, natančnostjo in nepopustljivo predanostjo kakovosti.
              </p>

              <p>
                Naša ponudba obsega celoten spekter gradbenih del – od začetnih temeljev in arhitekturnih načrtov pa vse do zaključnih del ter podpisovanja pogodbenih projektov za stanovanjske in poslovne objekte. Zavedamo se, da gradnja ni le postavljanje sten, temveč uresničevanje vaših sanj in ustvarjanje prostorov, kjer se prepletata varnost in estetika.
              </p>

              <p>
                Pri <strong>William Construction</strong> verjamemo, da so trdni temelji osnova vsakega uspešnega sodelovanja. Zgradimo vašo prihodnost skupaj.
              </p>
            </div>

            <h4 className="about-benefits-heading">
              Zakaj izbrati nas?
            </h4>

            {/* 4 Benefit Cards Grid */}
            <div className="about-benefits-grid">
              {BENEFIT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.id} className="benefit-card">
                    <div className="benefit-icon-wrap">
                      <Icon size={20} />
                    </div>
                    <div className="benefit-text">
                      <h4 className="benefit-title">{card.title}</h4>
                      <p className="benefit-desc">{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons for Preview Mode */}
            {!isFull && (
              <div className="about-action-row">
                <Button 
                  to="/about" 
                  variant="primary" 
                  size="md" 
                  icon={ArrowRight}
                >
                  Spoznajte več o nas
                </Button>
                <Button 
                  to="/services" 
                  variant="outline" 
                  size="md"
                >
                  Oglejte si vse storitve
                </Button>
              </div>
            )}
          </FadeIn>
        </div>

        {/* Extended Section for About Us Full Page */}
        {isFull && (
          <div className="about-extended-content">
            <div className="extended-title-wrap">
              <h3 className="extended-title">Zakaj izbrati nas?</h3>
              <p className="extended-subtitle">
                Naša načela in zaveza k vrhunski gradbeni kakovosti pri vsakem projektu.
              </p>
            </div>

            <div className="extended-values-grid">
              {EXTENDED_VALUES.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="value-card">
                    <div className="value-icon-box">
                      <Icon size={24} />
                    </div>
                    <h4 className="value-heading">{val.title}</h4>
                    <p className="value-desc">{val.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Stats Counter Bar */}
            <div className="about-stats-bar">
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Predanost kakovosti in trdnosti</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Zanesljiva podpora naročnikom</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">0</span>
                <span className="stat-label">Zamud pri dogovorjenih rokih</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">1.</span>
                <span className="stat-label">Partner za celovite gradbene rešitve</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
