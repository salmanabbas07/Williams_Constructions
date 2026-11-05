// src/components/ImagePlaceholder/ImagePlaceholder.jsx
import React, { useState } from 'react';
import { HardHat, Building2, Flame, Truck, Users, ShieldCheck, FileCheck, Landmark, Boxes, Factory, Image as ImageIcon } from 'lucide-react';
import './ImagePlaceholder.css';

const ICON_MAP = {
  construction: Building2,
  welding: Flame,
  machinery: Truck,
  operators: Truck,
  workforce: Users,
  about: Users,
  compliance: ShieldCheck,
  safety: ShieldCheck,
  documents: FileCheck,
  infrastructure: Landmark,
  warehousing: Boxes,
  manufacturing: Factory,
  default: HardHat
};

export const ImagePlaceholder = ({
  src,
  alt = 'Williams Constructions slika',
  aspectRatio = '16/9',
  category = 'default',
  filename = '',
  caption = '',
  className = '',
  style = {},
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const IconComponent = ICON_MAP[category] || ICON_MAP.default;

  const hasRealImage = Boolean(src) && !imageError;

  return (
    <div
      className={`image-placeholder-container ${className}`}
      style={{
        aspectRatio,
        ...style
      }}
      role="img"
      aria-label={alt}
    >
      {hasRealImage ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className="real-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="placeholder-content">
          <div className="placeholder-grid-pattern" aria-hidden="true" />
          <div className="placeholder-accent-glow" aria-hidden="true" />
          
          <div className="placeholder-body">
            <div className="placeholder-icon-wrap">
              <IconComponent className="placeholder-icon" />
            </div>
            
            {caption && <span className="placeholder-caption">{caption}</span>}
            
            {filename && (
              <span className="placeholder-filename">
                <ImageIcon size={12} className="inline-icon" />
                {filename}
              </span>
            )}
          </div>

          <div className="placeholder-badge">
            <span className="badge-dot" /> Williams Vizualni prikaz
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePlaceholder;
