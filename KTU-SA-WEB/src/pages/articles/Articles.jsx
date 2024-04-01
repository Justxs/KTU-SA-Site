import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroImage from '../../components/heroImage/HeroImage';
import Body from '../../components/body/Body';
import { useFetchArticles } from '../../hooks/useFetchArticles';
import styles from './Articles.module.css';
import ArticleListCard from './components/ArticleListCard';

export default function Articles() {
  const { t } = useTranslation();
  const { data: articles, isLoading, error } = useFetchArticles();

  if (error) {
    return null;
  }

  return (
    <>
      <HeroImage sectionName={t('sections.articles')} />
      <Body>
        <div className={styles.Latest}>
          {articles && articles.slice(0, 2).map((article) => (
            <ArticleListCard
              key={article.id}
              article={article}
              isLoading={isLoading}
              isActive
            />
          ))}
          {isLoading
          && (
          <>
            <ArticleListCard
              article={{}}
              isActive
              showPreview
              skeleton
            />
            <ArticleListCard
              article={{}}
              isActive
              showPreview
              skeleton
            />
          </>
          )}
        </div>
        <div className={styles.GridContainer}>
          {articles && articles.slice(3).map((article) => (
            <ArticleListCard
              key={article.id}
              article={article}
              isLoading={isLoading}
              showPreview
            />
          ))}
          {isLoading
            && Array.from({ length: 6 }).map(() => (
              <ArticleListCard
                key={Math.random()}
                article={{}}
                skeleton
                showPreview
              />
            ))}
        </div>
      </Body>
    </>
  );
}
