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
        title="Politika zasebnosti (GDPR) | Williams Constructions"
        description="Preberite politiko zasebnosti in pravila obdelave osebnih podatkov podjetja Williams Services d.o.o. v skladu s Splošno uredbo GDPR ter zakonom ZVOP-2."
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
              <h2>1. Upravljavec osebnih podatkov in splošne določbe</h2>
              <p>
                Pri podjetjih Williams Services in Williams Constructions spoštujemo vašo zasebnost ter se zavezujemo k varnemu, preglednemu in zakonitemu ravnanju z vašimi osebnimi podatki. Ta politika zasebnosti pojasnjuje, katere osebne podatke zbiramo prek naše spletne strani, kontaktnih obrazcev ter poslovne komunikacije, zakaj jih obdelujemo in katere pravice vam pripadajo na podlagi Splošne uredbe o varstvu podatkov (Uredba (EU) 2016/679 – GDPR) in veljavnega slovenskega Zakona o varstvu osebnih podatkov (ZVOP-2).
              </p>
              <p>
                Upravljavec osebnih podatkov, zbranih prek te spletne strani in povpraševanj za napotitev gradbene delovne sile, je:
              </p>
              <div className="controller-details">
                <strong>{companyContact.companyName} / {companyContact.brandName}</strong>
                <p>Naslov: {companyContact.address}</p>
                <p>Telefon: {companyContact.phones[0].display}</p>
                <p>E-pošta: {companyContact.email}</p>
              </div>
            </section>

            <section className="policy-section">
              <h2>2. Vrste osebnih podatkov, ki jih zbiramo</h2>
              <p>
                Ko obiščete našo spletno stran, oddate povpraševanje za gradbene ali tehnične kadre, zaprosite za ponudbo podizvajalskih storitev ali zahtevate termin sestanka, lahko zbiramo naslednje kategorije podatkov:
              </p>
              <ul>
                <li><strong>Identifikacijski podatki kontaktne osebe:</strong> Ime in priimek, vloga oziroma delovno mesto v podjetju naročnika ter podatki za komunikacijo.</li>
                <li><strong>Podatki o poslovnem subjektu:</strong> Naziv podjetja, poslovni naslov, davčna številka ter natančna lokacija gradbišča ali industrijskega obrata v Republiki Sloveniji.</li>
                <li><strong>Kontaktni podatki:</strong> Poslovni e-poštni naslov in telefonska številka za usklajevanje terminov, ogledov gradbišč in predložitev dokumentacije delavcev.</li>
                <li><strong>Projektne in kadrovske zahteve:</strong> Želeni gradbeni profili (npr. certificirani varilci ISO 9606-1, zidarji, strojniki težke gradbene mehanizacije), predviden datum napotitve, število delavcev, trajanje del in opis projekta.</li>
                <li><strong>Tehnični podatki in varnostni dnevniki:</strong> Anonimiziran ali začasen IP naslov, vrsta brskalnika, operacijski sistem ter čas dostopa, ki se beležijo prek strežniških dnevnikov izključno za zagotavljanje kibernetske varnosti in stabilnosti delovanja spletnega mesta.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>3. Namen in pravna podlaga za obdelavo</h2>
              <p>Vaše osebne podatke obdelujemo skrbno, sorazmerno in izključno za naslednje zakonite ter vnaprej določene namene:</p>
              <ul>
                <li><strong>Priprava ponudbe in izvedba pogodbe (člen 6(1)(b) GDPR):</strong> Preverjanje razpoložljivosti certificiranih delavcev, priprava komercialne ponudbe ter sklepanje in izvajanje pogodb o zagotavljanju delovne sile ali gradbenem podizvajalstvu.</li>
                <li><strong>Organizacija sestankov in terenske koordinacije:</strong> Uskladitev termina sestanka na vašem gradbišču ali na našem sedežu na Kotnikovi ulici 28 v Ljubljani ter tekoče vodenje ekip med izvajanjem projekta.</li>
                <li><strong>Izpolnjevanje zakonskih obveznosti (člen 6(1)(c) GDPR):</strong> Skladnost z delovnopravno, davčno, socialnovarstveno in gradbeno zakonodajo Republike Slovenije, vključno s postopki prijave delavcev in predložitvijo obveznih dokumentov za gradbiščni nadzor.</li>
                <li><strong>Zakoniti poslovni interesi (člen 6(1)(f) GDPR):</strong> Zaščita spletne strani pred zlorabami, samodejnimi vsiljenimi sporočili in nepooblaščenim dostopom ter izboljšanje kakovosti uporabniške izkušnje.</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>4. Zaupnost, varstvo in posredovanje podatkov tretjim osebam</h2>
              <p>
                Vaših osebnih ali poslovnih podatkov nikoli ne prodajamo, ne dajemo v najem in jih ne posredujemo nepovezanim tretjim osebam za namene neposrednega trženja. Dostop do podatkov imajo izključno pooblaščeni zaposleni pri podjetju Williams Services, ki so zavezani k varovanju poslovne tajnosti in osebnih podatkov. Podatke delimo le takrat, ko je to zakonsko obvezno ali nujno za izvedbo storitve:
              </p>
              <ul>
                <li><strong>Pristojni državni organi v Republiki Sloveniji:</strong> Zavod RS za zaposlovanje, Upravne enote, Finančna uprava RS in Inšpektorat RS za delo v okviru zakonitih upravnih postopkov za enotna dovoljenja in prijave delavcev.</li>
                <li><strong>Pooblaščeni izvajalci medicine dela in varnosti pri delu:</strong> Izključno za izvedbo obveznih preventivnih zdravstvenih pregledov ter izpitov VZD pred prihodom delavcev na gradbišče.</li>
                <li><strong>Ponudniki gostovanja in e-poštne infrastrukture:</strong> Preverjeni tehnični partnerji v Evropskem gospodarskem prostoru, vezani s strogimi pogodbami o obdelavi osebnih podatkov (DPA) in ustreznimi tehničnimi varnostnimi ukrepi (šifriranje prenosa HTTPS/TLS).</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>5. Obdobje hrambe podatkov in piškotki</h2>
              <p>
                Podatke iz kontaktnih obrazcev hranimo le toliko časa, kolikor je nujno potrebno za obdelavo vašega povpraševanja, pripravo ponudbe in vodenje poslovne korespondence. Če do sklenitve pogodbenega sodelovanja ne pride, podatke iz povpraševanja izbrišemo najkasneje v 12 mesecih po zaključenem pogovoru, razen če nadaljnjo hrambo zahteva zakon.
              </p>
              <p>
                Pogodbeno in računovodsko dokumentacijo hranimo v skladu z zakonsko določenimi roki hrambe računovodskih, davčnih in gradbenih listin v Republiki Sloveniji (običajno 5 oziroma 10 let po zaključku poslovnega leta). Naša spletna stran ne uporablja vsiljivih oglaševalskih ali sledilnih piškotkov tretjih oseb za profiliranje obiskovalcev; obdeluje zgolj tehnično nujne sejne podatke, potrebne za varen prikaz spletne vsebine.
              </p>
            </section>

            <section className="policy-section">
              <h2>6. Vaše pravice po splošni uredbi GDPR in zakonu ZVOP-2</h2>
              <p>Kot posameznik, na katerega se nanašajo osebni podatki, imate v skladu z veljavno evropsko in slovensko zakonodajo kadarkoli naslednje pravice:</p>
              <ul>
                <li><strong>Pravica do dostopa:</strong> Zahtevate lahko potrditev, ali o vas obdelujemo osebne podatke, ter vpogled v kopijo hranjenih podatkov in namene obdelave.</li>
                <li><strong>Pravica do popravka:</strong> Zahtevate lahko takojšen popravek netočnih ali dopolnitev nepopolnih kontaktnih in poslovnih podatkov.</li>
                <li><strong>Pravica do izbrisa (pozabe):</strong> Zahtevate lahko izbris podatkov, kadar ti niso več potrebni ali kadar ne obstaja več zakonita pravna podlaga za njihovo hrambo.</li>
                <li><strong>Pravica do omejitve obdelave in ugovora:</strong> Obdelavo lahko začasno omejite ali ugovarjate obdelavi, ki temelji na zakonitih interesih.</li>
                <li><strong>Pravica do prenosljivosti in preklica privolitve:</strong> Če obdelava temelji na privolitvi, jo lahko kadarkoli prekličete, kar ne vpliva na zakonitost predhodne obdelave.</li>
                <li><strong>Pravica do pritožbe:</strong> Če menite, da z vašimi podatki ne ravnamo pravilno, imate vedno pravico vložiti pritožbo pri Informacijskem pooblaščencu Republike Slovenije (Dunajska cesta 22, 1000 Ljubljana).</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>7. Kontakt za vprašanja glede zasebnosti</h2>
              <p>
                Vsa vprašanja glede te politike zasebnosti ter zahteve za uveljavljanje vaših pravic nam lahko kadarkoli posredujete po elektronski pošti na <a href={`mailto:${companyContact.email}`}>{companyContact.email}</a>, po telefonu na {companyContact.phones[0].display} ali pisno po pošti na naslov sedeža podjetja: <strong>{companyContact.address}</strong>. Na vse zahteve bomo odgovorili brez nepotrebnega odlašanja in najkasneje v zakonskem roku enega meseca.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
