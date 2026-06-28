interface Certification {
  id: string;
  name: string;
  link: string;
  issuer: string;
  date: string;
  image?: string;
  description?: string;
  paperTitle?: string;
  award?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    id: 'best-paper',
    name: 'Best Research Paper',
    issuer: 'Cavite State University – Trece Martires City Campus',
    date: 'May 19, 2026',
    image: '@/assets/best-paper.png',
    link: '/certificates/best-paper',
    award: 'Best Paper – Developmental Category',
    paperTitle: 'Rescuennect: A Disaster Risk Management System in Barangay Bancaan Naic, Cavite',
    description:
      'Intellectual synergy took center stage at the Education, Management, Psychology, Information Technology Research Conference (EMPIRE) 2026! This premier event brought together the faculty, and student researchers to present groundbreaking studies across diverse disciplines.',
    url: 'https://www.facebook.com/share/p/17he5pgX2K/',
  },
  {
    id: 'empire-2026',
    name: 'EMPIRE 2026 Participation',
    issuer: 'Cavite State University – Trece Martires City Campus',
    date: 'May 19, 2026',
    image: '@/assets/empire-2026.png',
    link: '/certificates/empire-2026',
    paperTitle: 'Rescuennect: A Disaster Risk Management System in Barangay Bancaan Naic, Cavite',
    description:
      'Intellectual synergy took center stage at the Education, Management, Psychology, Information Technology Research Conference (EMPIRE) 2026! This premier event brought together the faculty, and student researchers to present groundbreaking studies across diverse disciplines.',
    url: 'https://www.facebook.com/share/p/17he5pgX2K/',
  },
  {
    id: 'startuplab',
    name: 'Certificate of Completion',
    issuer: 'Startuplab Business Center',
    date: 'May 21, 2026',
    link: 'https://verichain.solveforge.cloud/verify?doc=cert_John_Paul_M__Naag_johnpaulnaag_startuplab_gmail_com_June_12__2002_1779377230734_9msi8tsm33t&key=edf799756cfceff6c08e7bd6223f4d7bfa0ab5fc44a2188cf8a78810c5236a6b',
  },
];
