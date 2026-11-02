// src/pages/Home/sections/WhyChooseUs/WhyChooseUs.jsx
import React from 'react';
import { 
  Scale, 
  Zap, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Users2,
  Cpu,
  BadgeDollarSign
} from 'lucide-react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import ImagePlaceholder from '../../../../components/ImagePlaceholder/ImagePlaceholder';
import FadeIn from '../../../../components/Motion/FadeIn';
import './WhyChooseUs.css';

const FOUR_VALUES = [
  {
    title: 'Pošteno delo',
    subtitle: 'Pregledni pogoji tako za naročnike kot za delavce',
    icon: Scale
  },
  {
    title: 'Učinkovito delo',
    subtitle: 'Visoka dnevna produktivnost pod vodstvom usposobljenih vodij',
    icon: Zap
  },
  {
    title: 'Pravočasno delo',
    subtitle: 'Dosledno spoštovanje rokov, ki preprečuje drage zamude',
    icon: Clock
  },
  {
    title: '24/7 Koordinacija',
    subtitle: 'Stalna dosegljivost in neposreden stik z vodstvom v Sloveniji',
    icon: PhoneCall
  }
];

const SUPPORTING_FEATURES = [
  {
    text: 'Vodstvo, ki razume azijske delavce.',
    sub: 'Jezikovna empatija, kulturno prilagojen nadzor in neposredno vodenje.',
    icon: Users2
  },
  {
    text: 'Stabilne ekipe – brez nenehnih menjav.',
    sub: 'Stalna delovna zasedba na vašem gradbišču za nemoteno kontinuiteto dela.',
    icon: ShieldCheck
  },
  {
    text: 'Visokokakovosten zidarski, varilski in strojni kader.',
    sub: 'Preverjeni mojstri z dokazljivimi referencami in certifikati.',
    icon: Award
  },
  {
    text: 'Upravljavci gradbene mehanizacije in JCB-jev z resničnimi izkušnjami.',
    sub: 'Varno in natančno delo z bagri, žerjavi ter nakladalci.',
    icon: Cpu
  },
  {
    text: 'Pregledno in hitro reševanje izzivov.',
    sub: 'Neposredni odločevalci rešijo vsak zastoj na gradbišču v najkrajšem času.',
    icon: CheckCircle2
  },
  {
    text: 'Prilagodljivost ter optimalni stroški za podjetja.',
    sub: 'Prilagajanje števila delavcev glede na trenutne gradbene faze in potrebe.',
    icon: BadgeDollarSign
  },
  {
    text: '24/7 koordinacija na gradbišču.',
    sub: 'Stalna kontaktna točka za nujna operativna usklajevanja ter varnost.',
    icon: PhoneCall
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section section-py bg-light" id="why-choose-us">
      <div className="container">
        <SectionTitle
          badge="Prednost podjetja Williams"
          title="Zakaj se podjetja odločajo za nas?"
          subtitle="Williams Services je danes med najhitreje rastočimi ponudniki delovne sile in gradbenih storitev v Sloveniji, saj delamo preprosto: Pošteno, učinkovito, pravočasno."
          align="center"
        />

        {/* 4 Core Values Banner */}
        <div className="values-banner-grid">
          {FOUR_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="value-banner-card">
                <div className="value-banner-icon">
                  <Icon size={24} />
                </div>
                <h3 className="value-banner-title">{val.title}</h3>
                <p className="value-banner-sub">{val.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Supporting Features + Visual Showcase Layout */}
        <div className="why-features-layout">
          {/* Left Column: 7 Distinct Features */}
          <FadeIn direction="up" delay={0.1} className="features-list-wrap">
            <h3 className="features-block-heading">
              Zgrajeno na disciplini, zanesljivosti in neposredni odgovornosti
            </h3>

            <div className="features-cards-grid">
              {SUPPORTING_FEATURES.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <div key={index} className="feature-item-card">
                    <div className="feature-item-icon">
                      <Icon size={20} />
                    </div>
                    <div className="feature-item-content">
                      <h4 className="feature-item-title">{feat.text}</h4>
                      <p className="feature-item-sub">{feat.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Right Column: Visual Showcase */}
          <FadeIn direction="up" delay={0.2} className="why-visual-wrap">
            <div className="why-image-sticky">
              <ImagePlaceholder
                aspectRatio="4/5"
                category="about"
                filename="why-choose-williams-constructions.jpg"
                caption="Zanesljiva delovna sila na gradbenem objektu v Sloveniji"
                className="why-main-image"
              />

              <div className="why-quote-card">
                <p className="quote-phrase">
                  "Povezujemo jezik, kulturo in visoke evropske gradbene standarde, da vaši projekti tečejo brezhibno."
                </p>
                <span className="quote-author">— Vodstvo Williams Services</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
