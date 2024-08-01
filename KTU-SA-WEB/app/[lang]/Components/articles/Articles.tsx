import styles from './Articles.module.css';
import SectionName from '@components/sectionName/SectionName';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import { getLocale, getTranslations } from 'next-intl/server';
import ArticleCard from '@components/articleCard/ArticleCard';
import { getArticles } from '@api/GetArticles';

export default async function Articles() {
  const t = await getTranslations();
  const locale = await getLocale();

  const articles = await getArticles(locale, 5);

  if (articles?.length === 0) return null;

  return (
    <div className={styles.Container}>
      <SectionName 
        title={t('sections.articles')} 
        showArrow 
      />
      <div className={styles.Section}>
        {articles && articles.length > 0 && (
          <ArticleCard
            article={articles[0]}
            isActive
            showPreview
          />
        )}
        <div className={styles.GridContainer}>
          {articles && articles.slice(1, 5).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
      <ReadMoreButton
        title={t('button.articles')}
        path="/articles"
        isCenter
      />
    </div>
  );
}
