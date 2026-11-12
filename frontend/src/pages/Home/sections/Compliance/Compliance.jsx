// src/pages/Home/sections/Compliance/Compliance.jsx
import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  HeartPulse, 
  ScrollText, 
  UserCheck, 
  CheckCircle,
  FileBadge
} from 'lucide-react';
import { complianceData } from '../../../../data/complianceData';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import ImagePlaceholder from '../../../../components/ImagePlaceholder/ImagePlaceholder';
import FadeIn from '../../../../components/Motion/FadeIn';
import './Compliance.css';

const ICON_MAP = {
  FileCheck,
  ShieldCheck,
  HeartPulse,
  ScrollText,
  UserCheck
};

export const Compliance = () => {
  return (
    <section className="compliance-section section-py bg-white" id="compliance">
      <div className="container">
        <SectionTitle
          badge="Brez pravnih tveganj za izvajalce"
          title="Skladnost in dokumentacija urejeni od začetka do konca"
          subtitle="Vsak delavec, ki ga zagotovi Williams Constructions, v celoti izpolnjuje slovensko zakonodajo in zahteve na gradbišču. Vse dokumente pripravimo pred prihodom delavcev, tako da vaši projekti tečejo nemoteno že od prvega dne."
          align="center"
        />

        <div className="compliance-layout">
          {/* Left Column: Visual Showcase */}
          <FadeIn direction="up" delay={0.1} className="compliance-visual-wrap">
            <ImagePlaceholder
              src="/images/compliance-documents-slovenia.webp"
              alt="Predhodno preverjena delovna dovoljenja, zdravniški pregledi in potrdila VZD"
              aspectRatio="4/3"
              category="compliance"
              filename="compliance-documents-slovenia.webp"
              caption="Predhodno preverjena delovna dovoljenja, zdravniški pregledi in potrdila VZD"
              className="compliance-image"
            />

            <div className="compliance-guarantee-card">
              <div className="guarantee-icon-wrap">
                <FileBadge size={26} />
              </div>
              <div>
                <h3 className="guarantee-title">Skladno s slovensko zakonodajo</h3>
                <p className="guarantee-text">
                  Enotno dovoljenje za prebivanje in delo ter izpit iz VZD izdana pred prvim delovnim dnem.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: 5 Information Blocks */}
          <div className="compliance-blocks-list">
            {complianceData.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon] || CheckCircle;

              return (
                <FadeIn key={item.id} direction="up" delay={0.1 + idx * 0.08}>
                  <div className="compliance-block">
                    <div className="compliance-index-box">
                      <span className="compliance-number">0{idx + 1}</span>
                      <div className="compliance-icon-wrap">
                        <IconComponent size={20} />
                      </div>
                    </div>

                    <div className="compliance-block-content">
                      <h3 className="compliance-block-title">{item.title}</h3>
                      <p className="compliance-block-lead">{item.description}</p>
                      <p className="compliance-block-details">{item.details}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compliance;
