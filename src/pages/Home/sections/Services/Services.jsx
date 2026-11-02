// src/pages/Home/sections/Services/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Building2, 
  Flame, 
  Truck, 
  Users, 
  HardHat, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { servicesData } from '../../../../data/servicesData';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import Button from '../../../../components/Button/Button';
import ImagePlaceholder from '../../../../components/ImagePlaceholder/ImagePlaceholder';
import FadeIn from '../../../../components/Motion/FadeIn';
import './Services.css';

const ICON_MAP = {
  Hammer,
  Building2,
  Flame,
  Truck,
  Users,
  HardHat
};

export const Services = ({ variant = 'preview' }) => {
  const isFull = variant === 'full';

  return (
    <section className={`services-section section-py ${isFull ? 'services-full-view' : 'bg-light'}`} id="services">
      <div className="container">
        <SectionTitle
          badge="Strokovna gradbena delovna sila"
          title="Naše gradbene in tehnične storitve"
          subtitle="Williams Constructions zagotavlja certificirane gradbene mojstre, usposobljene strojnike ter celovite podizvajalske ekipe po vsej Sloveniji."
          align="center"
        />

        <div className={`services-grid ${isFull ? 'services-grid-full' : ''}`}>
          {servicesData.map((service, idx) => {
            const IconComponent = ICON_MAP[service.icon] || HardHat;

            return (
              <FadeIn key={service.id} delay={idx * 0.08} direction="up">
                <div id={service.id} className="service-card">
                  {/* Image Placeholder */}
                  <div className="service-card-image-wrap">
                    <ImagePlaceholder
                      aspectRatio="16/10"
                      category={service.id}
                      filename={service.image}
                      caption={service.title}
                    />
                    <div className="service-icon-floating">
                      <IconComponent size={22} />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="service-card-body">
                    <span className="service-subtitle">{service.subtitle}</span>
                    <h3 className="service-card-title">{service.title}</h3>
                    
                    <p className="service-card-desc">
                      {isFull ? service.fullDescription : service.shortDescription}
                    </p>

                    {/* If Full page, render feature list */}
                    {isFull && service.features && (
                      <ul className="service-feature-list">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="service-feature-item">
                            <CheckCircle2 size={16} className="feature-check-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Card Action */}
                    <div className="service-card-footer">
                      {isFull ? (
                        <Button
                          to={`/contact?service=${encodeURIComponent(service.title)}`}
                          variant="primary"
                          size="sm"
                          icon={ArrowRight}
                        >
                          Zahtevajte ta profil
                        </Button>
                      ) : (
                        <Link to={`/services#${service.id}`} className="service-read-more-btn">
                          <span>Preberite več</span>
                          <ArrowRight size={16} className="read-more-arrow" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* View All CTA on preview */}
        {!isFull && (
          <div className="services-bottom-cta">
            <Button
              to="/services"
              variant="secondary"
              size="lg"
              icon={ArrowRight}
            >
              Raziščite celoten nabor storitev in profilov
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
