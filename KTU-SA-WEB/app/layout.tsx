import '@styles/globals.css';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

const baseUrl = process.env.KTU_SA_WEB_URL || 'http://localhost:3000/';

export const metadata: Metadata = {
  title: {
    default: 'KTU Studentų atstovybė',
    template: '%s | KTU SA',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      lt: '/lt',
    },
  },
  description:
    'Įsikurus 1993 m. KTU SA veikla yra universiteto studentų interesų atstovavimas universitete ir Lietuvos studentų sąjungoje.',
  keywords: [
    'KTU',
    'KTU SA',
    'Studentų atstovybė',
    'Students Union',
    'Kauno technologijos universitetas',
    'Kaunas University of Technology',
    'studentai',
    'students',
    'renginiai',
    'events',
    'stipendijos',
    'scholarships',
  ],
  openGraph: {
    title: 'KTU Studentų atstovybė',
    description:
      'Įsikurus 1993 m. KTU SA veikla yra universiteto studentų interesų atstovavimas universitete ir Lietuvos studentų sąjungoje.',
    type: 'website',
    locale: 'lt_LT',
    alternateLocale: 'en_US',
    siteName: 'KTU Studentų atstovybė',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KTU_SA',
    title: 'KTU Studentų atstovybė',
    description:
      'Įsikurus 1993 m. KTU SA veikla yra universiteto studentų interesų atstovavimas universitete ir Lietuvos studentų sąjungoje.',
  },
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
};

export default function RootLayout({ children }: Readonly<Props>) {
  return children;
}
