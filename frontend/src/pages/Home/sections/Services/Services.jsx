// src/pages/Home/sections/Services/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
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
import 'swiper/css';
import 'swiper/css/pagination';
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

        {isFull ? (
          /* Full page static grid layout */
          <div className="services-grid services-grid-full">
            {servicesData.map((service, idx) => {
              const IconComponent = ICON_MAP[service.icon] || HardHat;

              return (
                <FadeIn key={service.id} delay={idx * 0.08} direction="up" className="service-card-wrapper">
                  <div id={service.id} className="service-card">
                    {/* Image Placeholder */}
                    <div className="service-card-image-wrap">
                      <ImagePlaceholder
                        src={service.image}
                        alt={service.imageAlt || service.title}
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
                        {service.fullDescription}
                      </p>

                      {/* If Full page, render feature list */}
                      {service.features && (
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
                        <Button
                          to={`/contact?service=${encodeURIComponent(service.title)}`}
                          variant="primary"
                          size="sm"
                          icon={ArrowRight}
                        >
                          Zahtevajte ta profil
                        </Button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          /* Home page automatic carousel */
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            speed={600}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 24
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30
              }
            }}
            className="services-swiper"
          >
            {servicesData.map((service) => {
              const IconComponent = ICON_MAP[service.icon] || HardHat;

              return (
                <SwiperSlide key={service.id} className="services-swiper-slide">
                  <div id={service.id} className="service-card">
                    {/* Image Placeholder */}
                    <div className="service-card-image-wrap">
                      <ImagePlaceholder
                        src={service.image}
                        alt={service.imageAlt || service.title}
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
                        {service.shortDescription}
                      </p>

                      {/* Card Action */}
                      <div className="service-card-footer">
                        <Link to={`/services#${service.id}`} className="service-read-more-btn">
                          <span>Preberite več</span>
                          <ArrowRight size={16} className="read-more-arrow" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

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
