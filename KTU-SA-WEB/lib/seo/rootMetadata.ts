import { Metadata } from 'next';
import { buildLanguageAlternates } from '@/lib/seo/languageAlternates';
import { getMetadataBase, toAbsoluteUrl } from '@/lib/seo/siteUrl';

const defaultOgImage = toAbsoluteUrl('/opengraph-image.png');
const defaultTwitterImage = toAbsoluteUrl('/twitter-image.png');

export const metadata: Metadata = {
  title: {
    default: 'KTU SA – Studentų atstovybė',
    template: '%s | KTU SA',
  },
  alternates: {
    languages: buildLanguageAlternates(''),
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
    siteName: 'KTU SA',
    url: toAbsoluteUrl('/'),
    images: [{ url: defaultOgImage, alt: 'KTU Studentų atstovybė' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KTU_SA',
    title: 'KTU Studentų atstovybė',
    description:
      'Įsikurus 1993 m. KTU SA veikla yra universiteto studentų interesų atstovavimas universitete ir Lietuvos studentų sąjungoje.',
    images: [defaultTwitterImage],
  },
  metadataBase: getMetadataBase(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': 160,
    },
  },
  verification: {},
};
