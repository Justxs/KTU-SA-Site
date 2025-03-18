import { getArticle } from '@api/GetArticles';
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import HeroImage from './components/articleHero/HeroImage';
import styles from './Article.module.css';
import Sidebar from './components/sidebar/Sidebar';
import Body from '@components/htmlBody/Body';
import SideMargins from '@components/margins/SideMargins';

export async function generateMetadata(props: { params: Promise<{ articleId: string }> }) {
  const params = await props.params;
  const locale = await getLocale();
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  }
  catch {
    return notFound();
  }
  const desc = article.htmlBody.replace(/<\/[^>]+(>|$)/g, '');
  return {
    title: article.title,
    description: desc,
    openGraph: {
      title: article.title,
      description: desc,
      type: 'website',
      locale: locale,
      url: 'https://www.ktusa.lt',
      siteName: 'KTU Studentų atstovybė',
      images: [{
        url: article.thumbnailImageId,
      }],
    },
  };
}

export default async function Page(props: { params: Promise<{ articleId: string }> }) {
  const params = await props.params;
  const locale = await getLocale();
  let article = undefined;

  try {
    article = await getArticle(locale, params.articleId);
  }
  catch {
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
        <div className={styles.Container}>
          <Sidebar article={article} />
          <Body
            htmlBody={article.htmlBody}
          />
        </div>
      </SideMargins>
    </>
  );
}
