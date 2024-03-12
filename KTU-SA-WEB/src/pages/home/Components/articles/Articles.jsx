import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Articles.module.css";
import ArticleCard from "../../../../components/articleCard/ArticleCard";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import { useFetchArticles } from "../../../../hooks/useFetchArticles";
import { useTranslation } from "react-i18next";

export default function Articles() {
  const {t} = useTranslation();
  const fetchArticlesCount = 5;
  const { data: articles, isLoading, error } = useFetchArticles("LT", fetchArticlesCount);

  if (error) return <></>;

  return (
    <div className={styles.Container}>
      <SectionName title={t('sections.articles')} showArrow />
      <div className={styles.Section}>
        {articles && articles.length > 0 && (
          <ArticleCard
            article={articles[0]}
            isLoading={isLoading}
            isActive
            showPreview
          />
        )}
        {isLoading && 
          <ArticleCard
            article={{}}
            isActive
            showPreview
            skeleton
          />
        }
        <div className={styles.GridContainer}>
          {articles && articles.slice(1, 5).map((article) => (
            <ArticleCard 
              key={article.id}
              article={article}
              isLoading={isLoading}
            />
          ))}
          {isLoading && 
            Array.from({ length: 4 }).map((index) => (
              <ArticleCard
                key={index}
                article={{}}
                skeleton
              />
            ))
          }
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title={t('button.articles')} path="/Articles" />
      </div>
    </div>
  );
}
