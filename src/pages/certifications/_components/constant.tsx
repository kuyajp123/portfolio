interface Certification {
  id: string;
  name: string;
  link: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  {
    id: 'best-paper',
    name: 'Best Research Paper Certification',
    issuer: 'Cavite State University Trece Martires Campus',
    date: 'May 26, 2026',
    link: '/certificates/best-paper',
  },
  {
    id: 'empire-2026',
    name: 'Certificate of Recognition for Participation in EMPIRE 2026',
    issuer: 'Cavite State University Trece Martires Campus',
    date: 'May 26, 2026',
    link: '/certificates/empire-2026',
  },
  {
    id: 'startuplab',
    name: 'Certificate of Completion',
    issuer: 'Startuplab Business Center',
    date: 'May 21, 2026',
    link: 'https://verichain.solveforge.cloud/verify?doc=cert_John_Paul_M__Naag_johnpaulnaag_startuplab_gmail_com_June_12__2002_1779377230734_9msi8tsm33t&key=edf799756cfceff6c08e7bd6223f4d7bfa0ab5fc44a2188cf8a78810c5236a6b',
  },
];
