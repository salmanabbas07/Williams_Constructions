// src/components/PageHero/PageHero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';
import './PageHero.css';

export const PageHero = ({
  badge = '',
  title,
  subtitle = '',
  breadcrumbs = [],
  bgImage = '',
  src = ''
}) => {
  const heroImage = bgImage || src;

  return (
    <div className={`page-hero-banner ${heroImage ? 'has-bg-image' : ''}`}>
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          width={1600}
          height={680}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="page-hero-bg-image"
          aria-hidden="true"
        />
      )}
      <div className="page-hero-overlay" aria-hidden="true" />
      <div className="container page-hero-container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-link">
                <HomeIcon size={14} />
                <span>Domov</span>
              </Link>
            </li>
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="breadcrumb-item">
                <ChevronRight size={13} className="breadcrumb-chevron" />
                {crumb.path ? (
                  <Link to={crumb.path} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-current" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {badge && (
          <span className="page-hero-badge">
            <span className="page-hero-badge-dot" />
            {badge}
          </span>
        )}

        <h1 className="page-hero-title">{title}</h1>

        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHero;
