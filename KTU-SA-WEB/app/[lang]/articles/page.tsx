import React from 'react';
import { Grid } from '@mui/material';
import styles from './Articles.module.css';
import ArticleListCard from './components/ArticleListCard';
import HeroImage from '@components/heroImage/HeroImage';
import EmptyData from '@components/emptyData/EmptyData';
import { getLocale, getTranslations } from 'next-intl/server';
import { getArticles } from '@api/GetArticles';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';

export async function generateMetadata(){
  const t = await getTranslations();
  const locale = await getLocale();

  const heroSection = await getHeroImage(locale, t('sections.articles'));

  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [{
        url: heroSection.imgSrc,
      }],
    },
  };
}

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();
  const articles = await getArticles(locale);

  return (
    <>
      <HeroImage sectionName={t('sections.articles')} />
      <SideMargins>
        <div className={styles.Margin}>
            <EmptyData length={articles?.length} />
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
                    isActive={index < 2}
                    />
                </div>
                </Grid>
            ))}
            </Grid>
        </div>
      </SideMargins>
    </>
  );
}
