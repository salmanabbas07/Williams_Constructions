// src/pages/Home/sections/Industries/Industries.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Landmark, 
  Flame, 
  Truck, 
  Boxes, 
  Factory, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { industriesData } from '../../../../data/industriesData';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Button from '../../../../components/Button/Button';
import ImagePlaceholder from '../../../../components/ImagePlaceholder/ImagePlaceholder';
import FadeIn from '../../../../components/Motion/FadeIn';
import './Industries.css';

const ICON_MAP = {
  Building,
  Landmark,
  Flame,
  Truck,
  Boxes,
  Factory
};

export const Industries = ({ variant = 'preview' }) => {
  const isFull = variant === 'full';

  return (
    <section className={`industries-section section-py ${isFull ? 'industries-full-page' : 'bg-light'}`} id="industries">
      <div className="container">
        <SectionTitle
          badge="Gospodarske panoge in naročniki"
          title="Panoge, ki jim nudimo podporo"
          subtitle="Williams Constructions zagotavlja gradbenim, infrastrukturnim in industrijskim podjetjem po vsej Sloveniji zanesljivo ter polno dokumentirano delovno silo za kratkoročne in dolgoročne projekte."
          align="center"
        />

        {/* 3 Supporting Strategic Highlights */}
        <div className="industries-highlights-bar">
          <div className="highlight-pill">
            <CheckCircle2 size={16} className="pill-check" />
            <span>Kvalificirana in nekvalificirana delovna sila za gradbišča in proizvodne obrate</span>
          </div>
          <div className="highlight-pill">
            <CheckCircle2 size={16} className="pill-check" />
            <span>Prilagodljiva napotitev na projektni ali pogodbeni osnovi</span>
          </div>
          <div className="highlight-pill">
            <CheckCircle2 size={16} className="pill-check" />
            <span>En zanesljiv partner za več lokacij in delovnih profilov</span>
          </div>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="industries-grid">
          {industriesData.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Building;

            return (
              <FadeIn key={item.id} delay={idx * 0.08} direction="up">
                <div id={item.id} className="industry-card">
                  <div className="industry-card-img-wrap">
                    <ImagePlaceholder
                      aspectRatio="16/10"
                      category={item.id}
                      filename={item.image}
                      caption={item.title}
                    />
                    <div className="industry-tag-badge">
                      <IconComponent size={16} />
                      <span>{item.tagline}</span>
                    </div>
                  </div>

                  <div className="industry-card-body">
                    <h3 className="industry-title">{item.title}</h3>
                    <p className="industry-desc">
                      {isFull ? item.details : item.description}
                    </p>

                    {/* On full page, display typical roles */}
                    {isFull && item.roles && (
                      <div className="industry-roles-box">
                        <span className="roles-heading">Ključni profili:</span>
                        <div className="roles-tags">
                          {item.roles.map((role, rIdx) => (
                            <span key={rIdx} className="role-tag">{role}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="industry-card-action">
                      {isFull ? (
                        <Button
                          to={`/contact?industry=${encodeURIComponent(item.title)}`}
                          variant="primary"
                          size="sm"
                          icon={ArrowRight}
                        >
                          Zahtevajte kader za {item.title}
                        </Button>
                      ) : (
                        <Link to="/industries" className="industry-link">
                          <span>Podrobnosti o panogi</span>
                          <ArrowRight size={15} className="industry-link-arrow" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom CTA on Preview mode */}
        {!isFull && (
          <div className="industries-bottom-cta">
            <Button
              to="/industries"
              variant="secondary"
              size="md"
              icon={ArrowRight}
            >
              Oglejte si celoten obseg panožne podpore
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Industries;
