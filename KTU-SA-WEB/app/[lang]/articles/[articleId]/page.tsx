import { getArticle, getArticles } from '@api/GetArticles';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import HeroImage from './components/articleHero/HeroImage';
import Sidebar from './components/sidebar/Sidebar';
import Body from '@components/htmlBody/Body';
import SideMargins from '@components/margins/SideMargins';
import { LANGUAGES } from '@constants/Languages';

export const dynamicParams = false;

export async function generateMetadata(props: { params: Promise<{ articleId: string }> }) {
  const params = await props.params;
  const locale = await getLocale();
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  } catch {
    return notFound();
  }
  const desc = article.htmlBody.replaceAll(/<\/[^>]+(>|$)/g, '');
  return {
    title: article.title,
    description: desc,
    openGraph: {
      title: article.title,
      description: desc,
      type: 'website',
      locale,
      url: 'https://www.ktusa.lt',
      siteName: 'KTU Studentų atstovybė',
      images: [
        {
          url: article.thumbnailImageId,
        },
      ],
    },
  };
}

export default async function Page(props: Readonly<{ params: Promise<{ articleId: string }> }>) {
  const params = await props.params;
  const locale = await getLocale();
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  } catch {
    return notFound();
  }

  return (
    <>
      <HeroImage
        img={article.thumbnailImageId}
        title={article.title}
        date={article.createdDate}
        readingTime={article.readingTime}
      />
      <SideMargins>
        <div>
          <Sidebar article={article} />
          <Body htmlBody={article.htmlBody} />
        </div>
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
