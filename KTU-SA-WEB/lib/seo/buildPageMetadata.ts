import { Metadata } from 'next';
import { StaticPageHeroDto } from '@api/GetStaticPages';
import { buildLanguageAlternates, getLocalizedPath } from './languageAlternates';
import { toAbsoluteUrl } from './siteUrl';

const DEFAULT_SOCIAL_IMAGE = '/opengraph-image.png';

type PageSeoOptions = {
  heroSection: StaticPageHeroDto;
  lang: string;
  path: string;
};

function truncate(text: string, maxLength = 160): string {
  const normalized = text.trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.substring(0, maxLength).replace(/\s+\S*$/, '').trimEnd()}...`;
}

/**
 * Generates consistent metadata for pages that use HeroSection API data.
 * Adds alternates (hreflang), proper OpenGraph locale/url/siteName, and Twitter card.
 */
export function buildPageMetadata({ heroSection, lang, path }: PageSeoOptions): Metadata {
  const title = heroSection.title || 'KTU SA';
  const description = truncate(heroSection.description || title);
  const canonicalPath = getLocalizedPath(lang, path);
  const imageUrl = toAbsoluteUrl(heroSection.imgSrc || DEFAULT_SOCIAL_IMAGE);
  const locale = lang === 'lt' ? 'lt_LT' : 'en_US';
  const alternateLocale = lang === 'lt' ? 'en_US' : 'lt_LT';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale,
      alternateLocale,
      url: toAbsoluteUrl(canonicalPath),
      siteName: 'KTU Studentų atstovybė',
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title,
      description,
      images: [imageUrl],
    },
  };
}
