// src/data/navigationData.js

export const navLinks = [
  { label: 'Domov', path: '/' },
  { label: 'O nas', path: '/about' },
  {
    label: 'Storitve',
    path: '/services',
    isDropdown: true,
    children: [
      { label: 'Zidarska dela in gradbeništvo', path: '/services#masonry', id: 'masonry' },
      { label: 'Podizvajalske storitve', path: '/services#subcontracting', id: 'subcontracting' },
      { label: 'Varilci (TIG / MIG / MAG)', path: '/services#welders', id: 'welders' },
      { label: 'Upravljavci gradbene mehanizacije', path: '/services#machine-operators', id: 'machine-operators' },
      { label: 'Začasno in projektno zaposlovanje', path: '/services#temporary-staffing', id: 'temporary-staffing' },
      { label: 'Kvalificirani gradbeni delavci', path: '/services#skilled-workers', id: 'skilled-workers' }
    ]
  },
  { label: 'Projekti', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'Pogosta vprašanja', path: '/Pogosta vprašanja' },
  { label: 'Kontakt', path: '/contact' }
];

export const companyContact = {
  companyName: 'Williams Services',
  brandName: 'Williams Constructions',
  director: 'Toushif Williams',
  address: 'Kotnikova ulica 28, 1000 Ljubljana, Slovenia',
  phones: [
    { display: '+386 69 803 622', link: 'tel:+38669803622' },
    { display: '+386 70 447 982', link: 'tel:+38670447982' }
  ],
  email: 'info@wservicess.com',
  workingHours: 'Pon - Pet: 07:00 - 18:00 | Sob: 08:00 - 14:00',
  coordination: '24/7 Podpora in koordinacija na gradbišču',
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
    { name: 'WhatsApp', url: 'https://wa.me/38669803622', icon: 'MessageCircle' }
  ]
};
