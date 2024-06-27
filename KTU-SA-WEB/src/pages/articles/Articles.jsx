import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import HeroImage from '../../components/heroImage/HeroImage';
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
      <div className={styles.Margin}>

        <Grid container spacing={2}>
          {articles && articles.map((article, index) => (
            <Grid
              item
              xs={12}
              lg={6}
              xl={index < 2 ? 6 : 4}
              key={article.id}
            >
              <div className={styles.CardContainer}>
                <ArticleListCard
                  article={article}
                  isLoading={isLoading}
                  isActive={index < 2}
                />
              </div>
            </Grid>
          ))}
          {isLoading && Array.from({ length: 6 }).map((index) => (
            <Grid
              item
              xs={12}
              lg={6}
              xl={index < 2 ? 6 : 4}
              key={Math.random()}
            >
              <div className={styles.CardContainer}>
                <ArticleListCard
                  article={{}}
                  skeleton
                  isLoading={isLoading}
                  isActive={index < 2}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
