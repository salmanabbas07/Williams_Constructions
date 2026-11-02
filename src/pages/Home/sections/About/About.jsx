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
    id: 'efficiency',
    title: 'Višja učinkovitost',
    description: 'Dobro organizirana delovna sila z neposrednim nadzorom na gradbišču.',
    icon: Zap
  },
  {
    id: 'quality',
    title: 'Boljši nadzor kakovosti',
    description: 'Stalno spremljanje zagotavlja vrhunsko izvedbo del.',
    icon: CheckCircle2
  },
  {
    id: 'ontime',
    title: 'Pravočasna izvedba projektov',
    description: 'Jasno načrtovanje in neposredna komunikacija preprečujeta zamude.',
    icon: Clock
  },
  {
    id: 'reliable',
    title: 'Zanesljiva delovna sila',
    description: 'Stabilne ekipe brez stalnega menjavanja delavcev.',
    icon: ShieldCheck
  }
];

const EXTENDED_VALUES = [
  {
    title: 'Neposredno vodenje na terenu',
    desc: 'Naše vodstvo preživi čas na delovišču in ne za zaprtimi pisarniškimi vrati. Vse izzive rešujemo takoj pri viru.',
    icon: Briefcase
  },
  {
    title: 'Kulturna in jezikovna empatija',
    desc: 'Govorimo jezik naše mednarodne delovne sile, kar zagotavlja, da so varnostna pravila in gradbeni načrti razumljeni do potankosti.',
    icon: Users
  },
  {
    title: 'Stroga slovenska zakonodajna skladnost',
    desc: 'Vsak posamezen delavec ima urejeno enotno dovoljenje za prebivanje in delo, zdravniški pregled ter veljavno varstvo pri delu.',
    icon: ShieldCheck
  },
  {
    title: 'Brez stalnega menjavanja ekip',
    desc: 'Oblikujemo stabilne, povezane delovne skupine, ki ostanejo predane vašemu projektu od temeljnih del do zaključka.',
    icon: Award
  }
];

export const About = ({ variant = 'preview' }) => {
  const isFull = variant === 'full';

  return (
    <section className={`about-section section-py ${isFull ? 'about-section-full' : ''}`} id="about-section">
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="O podjetju Williams Services"
          title="Zidarstvo, delovna sila in tehnični kader v Sloveniji"
          subtitle={
            isFull 
              ? "Spoznajte izvor, vodstvo in operativno filozofijo zanesljivega partnerja za gradbeno delovno silo v Sloveniji."
              : "Zrasli iz resničnih izkušenj na gradbiščih za zagotavljanje zanesljive delovne sile in preglednega vodenja po vsej Sloveniji."
          }
          align="left"
        />

        {/* Main Two-Column Layout */}
        <div className="about-grid">
          {/* Left Column: Visuals & Experience Badge */}
          <FadeIn direction="up" delay={0.1} className="about-visual-col">
            <div className="about-image-wrapper">
              <ImagePlaceholder
                aspectRatio="4/3"
                category="about"
                filename="about-workforce-supervision.jpg"
                caption="Dvojezični nadzor in kontrola kakovosti na gradbišču"
                className="about-main-image"
              />

              {/* Floating Highlight Card */}
              <div className="about-experience-badge">
                <span className="exp-years">Neposredno</span>
                <span className="exp-label">Vodstvo na gradbišču</span>
                <span className="exp-sub">Osebna komunikacija z delavci</span>
              </div>
            </div>

            {/* In full mode, show Director Quote Box */}
            {isFull && (
              <div className="director-quote-box">
                <Quote size={28} className="quote-icon" />
                <p className="director-quote-text">
                  "Ko so delavci obravnavani s spoštovanjem, pravočasno plačani in vodeni v svojem jeziku, dosegajo mojstrstvo najvišjega evropskega ranga."
                </p>
                <div className="director-profile">
                  <strong>Toushif Williams</strong>
                  <span>Direktor, Williams Services d.o.o.</span>
                </div>
              </div>
            )}
          </FadeIn>

          {/* Right Column: Story & Narrative */}
          <FadeIn direction="up" delay={0.2} className="about-content-col">
            <div className="about-story-paragraphs">
              <p className="lead-paragraph">
                <strong>Williams Services</strong> je podjetje, ki je zraslo iz resničnih izkušenj na gradbiščih in ne iz pisarne. Naš direktor, <strong>Toushif Williams</strong>, izhaja neposredno iz operativnega dela ter je vrsto let delal ramo ob rami z azijskimi delavci, pri čemer je temeljito spoznal njihovo kulturo, jezik, delovno disciplino in načine dela.
              </p>

              <p>
                Medtem ko večina podjetij pripelje delavce brez razumevanja njihovih navad, komunikacije ali potreb po nadzoru – kar povzroča zamude in slabšo kakovost –, Williams Services deluje drugače. Toushif Williams osebno komunicira z delavci, redno preverja njihovo počutje, skrbi za motivacijo in zagotavlja, da je vsaka naloga jasno razumljena v jeziku, ki ga delavci obvladajo.
              </p>

              <p>
                Ta pristop zagotavlja trden nadzor, višjo produktivnost in stalno kakovost na slovenskih gradbiščih.
              </p>
            </div>

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
              <h3 className="extended-title">Naša vodilna operativna načela</h3>
              <p className="extended-subtitle">
                Kako se naša delovna kultura prenaša v zanesljivo izvedbo na vašem gradbišču.
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
                <span className="stat-label">Skladnost s slovensko zakonodajo</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Dvojezična podpora na gradbišču</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">0</span>
                <span className="stat-label">Skrbi z dovoljenji ali vizumi za naročnike</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">1.</span>
                <span className="stat-label">Izbira za kakovostno zidarstvo in varjenje</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
