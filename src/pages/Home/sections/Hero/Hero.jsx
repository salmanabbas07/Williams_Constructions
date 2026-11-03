// src/pages/Home/sections/Hero/Hero.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ArrowRight, PhoneCall, ShieldCheck, Award, Users } from 'lucide-react';
import Button from '../../../../components/Button/Button';
import './Hero.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Industrijska in varilska delovna sila',
    heading: 'Certificirana delovna sila za varjenje in montažo',
    description: 'Zagotavljanje visoko usposobljenih TIG, MIG/MAG varilcev za industrijsko proizvodnjo in zahtevne montažne projekte po vsej Sloveniji.',
    image: '/images/hero-welding-slovenia.webp',
    category: 'welding',
    stats: { number: '100%', label: 'ISO 9606 certificirani varilci' }
  },
  {
    id: 2,
    tag: 'Težka gradbena mehanizacija',
    heading: 'Izkušeni upravljavci težke gradbene mehanizacije',
    description: 'Usposobljeni strojniki za bagre, dvigala in nakladalce, ki zagotavljajo varen ter učinkovit potek del na gradbišču.',
    image: '/images/hero-machinery-operators.webp',
    category: 'machinery',
    stats: { number: '15+', label: 'let združenih izkušenj na terenu' }
  },
  {
    id: 3,
    tag: 'Zidarstvo in gradbena dela',
    heading: 'Zanesljivo zidarstvo in gradbena dela v Sloveniji',
    description: 'Kakovostna delovna sila, nemotena koordinacija in pravočasna izvedba projektov za gradbena podjetja po vsej Sloveniji.',
    image: '/images/hero-masonry-construction.webp',
    category: 'construction',
    stats: { number: '100%', label: 'Veljavna slovenska dovoljenja' }
  }
];

export const Hero = () => {
  return (
    <section className="hero-section" aria-label="Glavne predstavitvene prosojnice">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: false
        }}
        pagination={{
          clickable: true,
          el: '.hero-custom-pagination',
          bulletClass: 'hero-bullet',
          bulletActiveClass: 'hero-bullet-active'
        }}
        navigation={{
          nextEl: '.hero-nav-btn-next',
          prevEl: '.hero-nav-btn-prev'
        }}
        loop={true}
        className="hero-swiper"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-slide">
            {/* Background Image with Blueprint Grid & Gradient Overlay */}
            <div className="hero-bg-wrap">
              <img 
                src={slide.image} 
                alt={slide.heading} 
                className="hero-bg-image" 
                loading={slide.id === 1 ? 'eager' : 'lazy'}
              />
              <div className="hero-blueprint-grid" />
              <div className="hero-dark-overlay" />
            </div>

            {/* Content Container */}
            <div className="container hero-container">
              <div className="hero-content">
                <div className="hero-badge-wrap">
                  <span className="hero-badge">
                    <ShieldCheck size={16} /> {slide.tag}
                  </span>
                </div>

                <h1 className="hero-heading">
                  {slide.heading}
                </h1>

                <p className="hero-description">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="hero-cta-group">
                  <Button
                    to="/services"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                  >
                    Raziščite naše storitve
                  </Button>

                  <Button
                    to="/contact"
                    variant="outline-white"
                    size="lg"
                    icon={PhoneCall}
                  >
                    Zahtevajte delovno silo
                  </Button>
                </div>

                {/* Slide Quick Trust Metric */}
                <div className="hero-trust-bar">
                  <div className="trust-item">
                    <Award size={18} className="trust-icon" />
                    <div>
                      <strong className="trust-strong">{slide.stats.number}</strong>
                      <span className="trust-text">{slide.stats.label}</span>
                    </div>
                  </div>
                  <div className="trust-divider" />
                  <div className="trust-item">
                    <Users size={18} className="trust-icon" />
                    <div>
                      <strong className="trust-strong">24/7</strong>
                      <span className="trust-text">Terenska koordinacija</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows & Pagination */}
      <div className="hero-controls-bar container">
        <div className="hero-custom-pagination" />
        <div className="hero-arrows">
          <button 
            type="button" 
            className="hero-nav-btn hero-nav-btn-prev" 
            aria-label="Prejšnja prosojnica"
          >
            &#8592;
          </button>
          <button 
            type="button" 
            className="hero-nav-btn hero-nav-btn-next" 
            aria-label="Naslednja prosojnica"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
