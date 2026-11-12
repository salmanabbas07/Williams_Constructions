// src/components/SEO/SEO.jsx
import React, { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  schemaData = null,
  noIndex = false
}) => {
  const defaultTitle = 'Williams Constructions | Gradbena delovna sila Slovenija';
  const fullTitle = title || defaultTitle;
  const defaultDesc = 'Williams Constructions zagotavlja certificirane varilce, zidarje in strojnike težke gradbene mehanizacije s popolno pravno skladnostjo po vsej Sloveniji.';
  const metaDesc = description || defaultDesc;
  const siteUrl = 'https://williamscleaning.si';
  const normalizedCanonical = canonical === '/' ? '/' : canonical || '/';
  const canonicalUrl = `${siteUrl}${normalizedCanonical}`;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  useLayoutEffect(() => {
    document.head.querySelectorAll('[data-static-seo="true"]').forEach((el) => el.remove());
  }, [fullTitle, metaDesc, canonicalUrl, imageUrl, noIndex]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="sl_SI" />
      <meta property="og:site_name" content="Williams Constructions" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="2848" />
      <meta property="og:image:height" content="1504" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

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
