// src/data/navigationData.js

export const navLinks = [
  { label: 'Domov', path: '/' },
  { label: 'O nas', path: '/about' },
  { label: 'Storitve', path: '/services' },
  { label: 'Projekti', path: '/projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
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
  email: 'info.williamconstruction@gmail.com',
  workingHours: 'Pon - Pet: 07:00 - 18:00 | Sob: 08:00 - 14:00',
  coordination: '24/7 Podpora in koordinacija na gradbišču',
  socials: [
    { name: 'Facebook', url: 'https://www.facebook.com/share/1FpBTb6L7W/', icon: 'Facebook' },
    { name: 'Instagram', url: 'https://www.instagram.com/williams.construction.slovenia/', icon: 'Instagram' },
    { name: 'WhatsApp', url: 'https://wa.me/38669803622', icon: 'MessageCircle' }
  ]
};
