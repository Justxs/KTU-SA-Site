import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Articles.module.css";
import ArticleCard from "../../../../components/articleCard/ArticleCard";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import { useFetchArticles } from "../../../../hooks/useFetchArticles";

export default function Articles() {
  const fetchArticlesCount = 5;
  const { data: articles, isLoading, error } = useFetchArticles("LT", fetchArticlesCount);

  if (error) return <></>;
  if (isLoading) return <></>;

  return (
    <div className={styles.Container}>
      <SectionName title="Straipsniai" showArrow />
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
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title="Visi straipsniai" path="/Articles" />
      </div>
    </div>
  );
}
