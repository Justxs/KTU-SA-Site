import { getArticle, getArticles } from '@api/GetArticles';
import { blocksToPlainText } from '@api/helpers';
import { notFound } from 'next/navigation';
import HeroImage from './components/articleHero/HeroImage';
import Sidebar from './components/sidebar/Sidebar';
import ContentBlocks from '@components/contentBlocks/ContentBlocks';
import SideMargins from '@components/margins/SideMargins';
import JsonLd from '@components/seo/JsonLd';
import { LANGUAGES } from '@constants/Languages';
import { Metadata } from 'next';
import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { buildLanguageAlternates, getLocalizedPath } from '@/lib/seo/languageAlternates';
import { toAbsoluteUrl } from '@/lib/seo/siteUrl';

const DEFAULT_SOCIAL_IMAGE = '/opengraph-image.png';

function truncate(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).replace(/\s+\S*$/, '')}...`;
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; articleId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = params.lang;
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  } catch {
    return notFound();
  }

  const description = truncate(blocksToPlainText(article.blocks) || article.title);
  const encodedArticleId = encodeURIComponent(params.articleId);
  const articlePath = `/articles/${encodedArticleId}`;
  const canonicalPath = getLocalizedPath(locale, articlePath);
  const articleUrl = toAbsoluteUrl(canonicalPath);
  const socialImage = toAbsoluteUrl(article.thumbnailImageId || DEFAULT_SOCIAL_IMAGE);
  const localeCode = locale === 'lt' ? 'lt_LT' : 'en_US';
  const alternateLocale = locale === 'lt' ? 'en_US' : 'lt_LT';

  return {
    title: article.title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(articlePath),
    },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      locale: localeCode,
      alternateLocale,
      url: articleUrl,
      siteName: 'KTU Studentų atstovybė',
      publishedTime: new Date(article.createdDate).toISOString(),
      images: [
        {
          url: socialImage,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title: article.title,
      description,
      images: [socialImage],
    },
  };
}

export default async function Page(
  props: Readonly<{ params: Promise<{ lang: string; articleId: string }> }>,
) {
  const params = await props.params;
  const locale = params.lang;
  const t = await getTranslations({ locale });
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  } catch {
    return notFound();
  }

  const socialImage = toAbsoluteUrl(article.thumbnailImageId || DEFAULT_SOCIAL_IMAGE);
  const articlePath = `/articles/${encodeURIComponent(params.articleId)}`;
  const homePath = getLocalizedPath(locale, '');
  const articleListPath = getLocalizedPath(locale, '/articles');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: truncate(blocksToPlainText(article.blocks) || article.title),
    image: socialImage,
    datePublished: new Date(article.createdDate).toISOString(),
    url: toAbsoluteUrl(getLocalizedPath(locale, articlePath)),
    mainEntityOfPage: toAbsoluteUrl(getLocalizedPath(locale, articlePath)),
    publisher: {
      '@type': 'Organization',
      name: 'KTU Studentų atstovybė',
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/opengraph-image.png'),
      },
    },
    inLanguage: locale === 'lt' ? 'lt-LT' : 'en-US',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('common.ktusa'),
        item: toAbsoluteUrl(homePath),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('sections.articles'),
        item: toAbsoluteUrl(articleListPath),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: toAbsoluteUrl(getLocalizedPath(locale, articlePath)),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <HeroImage
        img={article.thumbnailImageId}
        title={article.title}
        date={article.createdDate}
        readingTime={article.readingTime}
        preview={blocksToPlainText(article.blocks)}
      />
      <SideMargins>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: '24px', lg: '40px' },
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, order: { xs: 2, lg: 1 } }}>
            <ContentBlocks blocks={article.blocks} />
          </Box>
          <Box
            sx={{
              order: { xs: 1, lg: 2 },
              width: { xs: '100%', lg: 'auto' },
              position: { xs: 'relative', lg: 'sticky' },
              top: { xs: 'auto', lg: '100px' },
              alignSelf: { xs: 'stretch', lg: 'flex-start' },
            }}
          >
            <Sidebar article={article} />
          </Box>
        </Box>
      </SideMargins>
    </>
  );
}

export async function generateStaticParams(): Promise<Array<{ lang: string; articleId: string }>> {
  const langs = Object.values(LANGUAGES);
  const params: Array<{ lang: string; articleId: string }> = [];

  for (const lang of langs) {
    try {
      const articles = await getArticles(lang);
      for (const a of articles ?? []) {
        params.push({ lang, articleId: a.id });
      }
    } catch (e) {
      // If fetching articles fails at build time, skip to avoid blocking build entirely.
      // It's preferable to have missing pages than to crash the whole build.
      console.warn(`generateStaticParams: failed to fetch articles for ${lang}:`, e);
    }
  }

  return params;
}

