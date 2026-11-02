// src/pages/NotFound/NotFoundPage.jsx
import React from 'react';
import { Home, Construction } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import Button from '../../components/Button/Button';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <SEO
        title="404 - Stran v izdelavi ali ni bila najdena"
        description="Zahtevana stran na spletnem mestu Williams Constructions ni bila najdena."
      />

      <div className="container not-found-container section-py">
        <div className="not-found-card">
          <div className="not-found-icon-wrap">
            <Construction size={48} className="construction-icon" />
          </div>
          <span className="not-found-badge">Napaka 404</span>
          <h1 className="not-found-title">Stran ni bila najdena ali je v izdelavi</h1>
          <p className="not-found-desc">
            Stran, ki jo iščete, je bila morda premaknjena, preimenovana ali pa je trenutno v fazi tehničnega posodabljanja.
          </p>

          <div className="not-found-actions">
            <Button to="/" variant="primary" size="md" icon={Home}>
              Vrnitev na prvo stran
            </Button>
            <Button to="/services" variant="outline" size="md">
              Oglejte si naše storitve
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
