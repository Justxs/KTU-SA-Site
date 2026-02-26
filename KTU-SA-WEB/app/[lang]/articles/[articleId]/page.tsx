import { getArticle, getArticles } from '@api/GetArticles';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import HeroImage from './components/articleHero/HeroImage';
import Sidebar from './components/sidebar/Sidebar';
import Body from '@components/htmlBody/Body';
import SideMargins from '@components/margins/SideMargins';
import JsonLd from '@components/seo/JsonLd';
import { LANGUAGES } from '@constants/Languages';
import { Metadata } from 'next';
import { Box } from '@mui/material';

const baseUrl = process.env.KTU_SA_WEB_URL || 'http://localhost:3000';

function stripHtml(html: string): string {
  return html.replaceAll(/<[^>]+(>|$)/g, '').trim();
}

function truncate(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).replace(/\s+\S*$/, '')}…`;
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; articleId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = await getLocale();
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  } catch {
    return notFound();
  }

  const description = truncate(stripHtml(article.htmlBody));
  const articleUrl = `${baseUrl}/${locale}/articles/${params.articleId}`;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: `/${locale}/articles/${params.articleId}`,
      languages: {
        en: `/en/articles/${params.articleId}`,
        lt: `/lt/articles/${params.articleId}`,
      },
    },
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      locale: locale === 'lt' ? 'lt_LT' : 'en_US',
      alternateLocale: locale === 'lt' ? 'en_US' : 'lt_LT',
      url: articleUrl,
      siteName: 'KTU Studentų atstovybė',
      publishedTime: new Date(article.createdDate).toISOString(),
      images: [
        {
          url: article.thumbnailImageId,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@KTU_SA',
      title: article.title,
      description,
      images: [article.thumbnailImageId],
    },
  };
}

export default async function Page(
  props: Readonly<{ params: Promise<{ lang: string; articleId: string }> }>,
) {
  const params = await props.params;
  const locale = await getLocale();
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  } catch {
    return notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: truncate(stripHtml(article.htmlBody)),
    image: article.thumbnailImageId,
    datePublished: new Date(article.createdDate).toISOString(),
    url: `${baseUrl}/${locale}/articles/${params.articleId}`,
    publisher: {
      '@type': 'Organization',
      name: 'KTU Studentų atstovybė',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/opengraph-image.png`,
      },
    },
    inLanguage: locale === 'lt' ? 'lt-LT' : 'en-US',
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <HeroImage
        img={article.thumbnailImageId}
        title={article.title}
        date={article.createdDate}
        readingTime={article.readingTime}
        htmlBody={article.htmlBody}
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
            <Body htmlBody={article.htmlBody} />
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
