// src/components/SEO/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  schemaData = null
}) => {
  const defaultTitle = 'Williams Constructions | Strokovna delovna sila in kadrovske storitve v Sloveniji';
  const fullTitle = title ? `${title} | Williams Constructions` : defaultTitle;
  const defaultDesc = 'Williams Constructions zagotavlja certificirane varilce (TIG, MIG/MAG), usposobljene zidarje, strojnike težke gradbene mehanizacije in zanesljivo delovno silo po vsej Sloveniji.';
  const metaDesc = description || defaultDesc;
  const siteUrl = 'https://thewilliamsconstructions.com';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Williams Constructions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />

      {/* Structured Data (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
