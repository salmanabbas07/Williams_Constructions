// src/pages/Home/sections/HowWeWork/HowWeWork.jsx
import React from 'react';
import { 
  Send, 
  Users, 
  FileCheck2, 
  Truck, 
  Activity, 
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Button from '../../../../components/Button/Button';
import FadeIn from '../../../../components/Motion/FadeIn';
import './HowWeWork.css';

const STEPS_DATA = [
  {
    step: '01',
    title: 'Pošljete potrebe po delovni sili',
    shortDesc: 'Opredelite zahtevane profile, število delavcev, začetek del in lokacijo gradbišča v Sloveniji.',
    fullDesc: 'Opišite vaše potrebe: profile (zidarji, varilci, strojniki, pomočniki), trajanje projekta, zahteve glede varnostne opreme in lokacijo. Vašo specifikacijo pregledamo v 24 urah.',
    icon: Send,
    duration: '1. dan'
  },
  {
    step: '02',
    title: 'Izbor in strokovno preverjanje',
    shortDesc: 'Praktično preverjanje znanj, ocena usposobljenosti in predhodni pregled dokumentov.',
    fullDesc: 'Vaše zahteve uskladimo z našo preverjeno bazo ali mobiliziramo izkušene delavce z dokazanimi referencami iz evropskih ter mednarodnih gradbišč. Po želji omogočimo video razgovore ali praktične preizkuse.',
    icon: Users,
    duration: '2.–4. dan'
  },
  {
    step: '03',
    title: 'Dokumentacija in dovoljenja',
    shortDesc: 'Ureditev enotnih dovoljenj, zdravniških pregledov in jasnih pogodb.',
    fullDesc: 'Naša pravna in kadrovska služba poskrbi za postopke enotnega dovoljenja za prebivanje in delo, zdravniški pregled pri pooblaščenem izvajalcu ter usposabljanje iz varnosti pri delu.',
    icon: FileCheck2,
    duration: 'Pred prihodom'
  },
  {
    step: '04',
    title: 'Napotitev in prihod delavcev',
    shortDesc: 'Prihod, seznanitev z gradbiščem, preverjanje opreme in hiter pričetek del.',
    fullDesc: 'Naš dvojezični koordinator osebno pospremi delavce na vaše gradbišče, jih predstavi vašemu vodji del in poskrbi za takojšnjo ter varno vključitev v delovni proces.',
    icon: Truck,
    duration: 'Dan napotitve'
  },
  {
    step: '05',
    title: 'Spremljanje uspešnosti in vodenje',
    shortDesc: 'Dvojezična koordinacija, spremljanje prisotnosti in stalni nadzor kakovosti.',
    fullDesc: 'Direktor Toushif Williams in naši terenski koordinatorji ostajajo v stalnem stiku z vašimi inženirji ter delavci, skrbijo za motivacijo, dnevni učinek in nemoten potek del.',
    icon: Activity,
    duration: 'Stalno 24/7'
  },
  {
    step: '06',
    title: 'Brezplačna zamenjava po potrebi',
    shortDesc: 'Hitra in nemotena zamenjava delavca, v kolikor profil ne ustreza vaši ekipi.',
    fullDesc: 'Če delavec ne izkaže pričakovanih praktičnih veščin ali delovne discipline, nemudoma zagotovimo ustrezno zamenjavo brez dodatnih stroškov ter zaščitimo vaš terminski načrt.',
    icon: RefreshCw,
    duration: 'Brez zastojev'
  }
];

export const HowWeWork = ({ variant = 'preview' }) => {
  const isFull = variant === 'full';

  return (
    <section className={`how-we-work-section section-py ${isFull ? 'how-we-work-full' : 'bg-white'}`} id="how-we-work">
      <div className="container">
        <SectionTitle
          badge="Urejen potek napotitve delavcev"
          title="Kako delamo"
          subtitle="Preprost in pregleden postopek v 6 korakih, zasnovan za hitro mobilizacijo zakonsko skladnih in usposobljenih gradbenih delavcev na vaše gradbišče brez administrativnih ovir."
          align="center"
        />

        {/* Timeline Component */}
        <div className="timeline-container">
          <div className="timeline-connecting-line" aria-hidden="true" />

          <div className="timeline-grid">
            {STEPS_DATA.map((item, index) => {
              const Icon = item.icon;

              return (
                <FadeIn key={item.step} delay={index * 0.08} direction="up" className="timeline-step-wrapper">
                  <div className="timeline-step-card">
                    <div className="timeline-badge-wrap">
                      <div className="timeline-node">
                        <span className="step-number">{item.step}</span>
                      </div>
                    </div>

                    <div className="timeline-content-card">
                      <div className="timeline-icon-box">
                        <Icon size={22} />
                      </div>

                      <div className="timeline-duration-tag">
                        <Clock size={12} />
                        <span>{item.duration}</span>
                      </div>

                      <h3 className="timeline-step-title">{item.title}</h3>
                      
                      <p className="timeline-step-desc">
                        {isFull ? item.fullDesc : item.shortDesc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Full Page Workflow Guarantees Box */}
        {isFull && (
          <div className="workflow-guarantees-box">
            <div className="guarantee-col">
              <h4>Fiksni roki</h4>
              <p>Brez nenadnih zamud pri prihodu kadra. Roki napotitve so naša trdna pogodbena zaveza.</p>
            </div>
            <div className="guarantee-col">
              <h4>Dvojezični most</h4>
              <p>Brez jezikovnih nesporazumov med vodstvom vašega gradbišča in delavci.</p>
            </div>
            <div className="guarantee-col">
              <h4>Popolna pravna varnost</h4>
              <p>Vsak delavec ima v celoti urejeno slovensko dokumentacijo pred začetkom dela.</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="how-we-work-cta">
          <Button
            to="/contact"
            variant="primary"
            size="md"
            icon={ArrowRight}
          >
            Začnite s 1. korakom – Pošljite povpraševanje
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
