import '@styles/globals.css';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode,
};

export const metadata: Metadata = {
  title: {
    default: 'KTU Studentų atstovybė',
    template: '%s - KTU SA',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'lt': '/lt',
    },
  },
  description: 'Įsikurus 1993 m. KTU SA veikla yra universiteto studentų interesų atstovavimas universitete ir Lietuvos studentų sąjungoje.',
};

export default function RootLayout({ children } : Readonly<Props>) {
  return children;
}
