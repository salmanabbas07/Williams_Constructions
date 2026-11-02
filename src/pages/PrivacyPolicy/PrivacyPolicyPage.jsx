// src/pages/PrivacyPolicy/PrivacyPolicyPage.jsx
import React from 'react';
import { Info } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import PageHero from '../../components/PageHero/PageHero';
import { companyContact } from '../../data/navigationData';
import './PrivacyPolicyPage.css';

export const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-page">
      <SEO
        title="Politika zasebnosti - Williams Services & Constructions"
        description="Informacije o varstvu osebnih podatkov in zasebnosti za podjetji Williams Services in Williams Constructions v skladu z zakonodajo GDPR in ZVOP-2."
        canonical="/privacy-policy"
      />

      <PageHero
        badge="Pravna varnost in preglednost"
        title="Politika zasebnosti"
        subtitle="Kako podjetje Williams Services zbira, obdeluje in varuje osebne podatke, posredovane prek naše spletne strani in kontaktnih obrazcev."
        breadcrumbs={[{ label: 'Politika zasebnosti' }]}
      />

      <div className="privacy-content-section section-py bg-white">
        <div className="container privacy-container">
          {/* Legal Notice Box */}
          <div className="legal-notice-box">
            <Info size={20} className="notice-icon" />
            <div>
              <strong>Obvestilo o pravni politiki:</strong> Ta dokument vsebuje standardna določila o varstvu podatkov v skladu s Splošno uredbo o varstvu podatkov (GDPR) in slovenskim Zakonom o varstvu osebnih podatkov (ZVOP-2). Specifične pravne prilagoditve lahko po potrebi uredite neposredno.
            </div>
          </div>

          <div className="privacy-body">
            <section className="policy-section">
              <h2>1. Upravljavec osebnih podatkov</h2>
              <p>
                Upravljavec osebnih podatkov, zbranih prek te spletne strani, je:
              </p>
              <div className="controller-details">
                <strong>{companyContact.companyName} / {companyContact.brandName}</strong>
                <p>Naslov: {companyContact.address}</p>
                <p>Telefon: {companyContact.phones[0].display}</p>
                <p>E-pošta: {companyContact.email}</p>
              </div>
            </section>

            <section className="policy-section">
              <h2>2. Osebni podatki, ki jih zbiramo</h2>
              <p>
                Ko obiščete našo spletno stran, oddate povpraševanje za kader ali zahtevate termin sestanka, lahko zbiramo naslednje podatke:
              </p>
              <ul>
                <li><strong>Identifikacijski podatki:</strong> Ime in priimek ter delovno mesto v podjetju.</li>
                <li><strong>Podatki o podjetju:</strong> Naziv podjetja, morebitna davčna številka in lokacija gradbišča v Sloveniji.</li>
                <li><strong>Kontaktni podatki:</strong> Poslovni e-poštni naslov in telefonska številka.</li>
                <li><strong>Projektne zahteve:</strong> Želeni gradbeni profili, predviden datum napotitve, število delavcev in kratek opis projekta.</li>
                <li><strong>Tehnični podatki:</strong> IP naslov, vrsta brskalnika in operacijski sistem, zbrani prek strežniških dnevnikov za varnostno zaščito.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>3. Namen in pravna podlaga za obdelavo</h2>
              <p>Vaše osebne podatke obdelujemo za naslednje zakonite namene:</p>
              <ul>
                <li>Priprava ponudbe in preverjanje razpoložljivosti delavcev v skladu s točko (b) prvega odstavka 6. člena GDPR (predpogodbeni ukrepi).</li>
                <li>Uskladitev sestanka na vašem gradbišču ali na našem sedežu v Ljubljani.</li>
                <li>Izpolnjevanje zakonskih obveznosti v Republiki Sloveniji (npr. postopki delovnih dovoljenj, davčne evidence).</li>
                <li>Zaščita spletne strani pred zlorabami in neavtoriziranimi vdori.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>4. Zaupnost in posredovanje podatkov tretjim osebam</h2>
              <p>
                Vaših podatkov ne prodajamo, ne oddajamo in jih ne posredujemo tržnim oglaševalcem. Podatki se delijo le z zaupanja vrednimi partnerji, kjer je to nujno potrebno:
              </p>
              <ul>
                <li>Pristojnimi državnimi organi v Republiki Sloveniji (Zavod RS za zaposlovanje, Upravne enote) izključno za postopke enotnih dovoljenj za delo.</li>
                <li>Pooblaščenimi izvajalci medicine dela za izvedbo obveznih zdravniških pregledov delavcev.</li>
                <li>Ponudniki varnega gostovanja spletne strani, vezanimi s strogimi pogodbami o obdelavi podatkov (DPA).</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>5. Obdobje hrambe podatkov</h2>
              <p>
                Podatke iz kontaktnih obrazcev hranimo le toliko časa, kolikor je potrebno za obdelavo vašega povpraševanja in vodenje poslovne korespondence, oziroma v skladu z zakonsko določenimi roki hrambe računovodskih in gradbenih listin.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Vaše pravice po splošni uredbi GDPR</h2>
              <p>V zvezi z vašimi osebnimi podatki imate pravico do:</p>
              <ul>
                <li>Dostopa do podatkov, ki jih hranimo o vas.</li>
                <li>Popravka netočnih ali nepopolnih podatkov.</li>
                <li>Izbrisa podatkov, kadar ne obstaja več pravna podlaga za njihovo hrambo.</li>
                <li>Omejitve obdelave ali ugovora obdelavi iz zakonitih razlogov.</li>
                <li>Pritožbe pri Informacijskem pooblaščencu Republike Slovenije.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>7. Kontakt za vprašanja glede zasebnosti</h2>
              <p>
                Za uveljavljanje pravic ali dodatna pojasnila nam pišite na <a href={`mailto:${companyContact.email}`}>{companyContact.email}</a> ali po pošti na naslov sedeža: <strong>{companyContact.address}</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
