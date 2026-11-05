// src/components/SectionTitle/SectionTitle.jsx
import React from 'react';
import './SectionTitle.css';

export const SectionTitle = ({
  badge = '',
  title,
  subtitle = '',
  align = 'center', // 'left', 'center', 'right'
  dark = false,
  className = '',
  as = 'h2'
}) => {
  const HeadingTag = as;

  return (
    <div className={`section-title-wrap text-${align} ${dark ? 'section-title-dark' : ''} ${className}`}>
      {badge && (
        <span className={`section-badge ${dark ? 'section-badge-dark' : ''}`}>
          <span className="section-badge-dot" />
          {badge}
        </span>
      )}
      
      <HeadingTag className="section-heading">
        {title}
      </HeadingTag>

      <div className={`section-divider align-${align}`} aria-hidden="true">
        <span className="divider-line" />
        <span className="divider-accent" />
      </div>

      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
