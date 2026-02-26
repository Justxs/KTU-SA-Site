import { Metadata } from 'next';
import { HeroSectionDto } from '@api/GetHeroImage';

const baseUrl = process.env.KTU_SA_WEB_URL || 'http://localhost:3000';

type PageSeoOptions = {
  heroSection: HeroSectionDto;
  lang: string;
  path: string;
};

/**
 * Generates consistent metadata for pages that use HeroSection API data.
 * Adds alternates (hreflang), proper OpenGraph locale/url/siteName, and Twitter card.
 */
export function buildPageMetadata({ heroSection, lang, path }: PageSeoOptions): Metadata {
  const description = heroSection.description || '';
  const canonicalPath = `/${lang}${path}`;

  return {
    title: heroSection.title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en${path}`,
        lt: `/lt${path}`,
      },
    },
    openGraph: {
      title: heroSection.title,
      description,
      type: 'website',
      locale: lang === 'lt' ? 'lt_LT' : 'en_US',
      alternateLocale: lang === 'lt' ? 'en_US' : 'lt_LT',
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'KTU Studentų atstovybė',
      images: heroSection.imgSrc ? [{ url: heroSection.imgSrc, alt: heroSection.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title: heroSection.title,
      description,
      images: heroSection.imgSrc ? [heroSection.imgSrc] : [],
    },
  };
}
