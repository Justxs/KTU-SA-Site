import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Articles.module.css";
import ArticleCard from "../../../../components/articleCard/ArticleCard";
import ReadMoreButton from "../../../../components/readMoreButton/ReadMoreButton";
import FallbackWrapper from "../../../../components/fallbackWrapper/FallbackWrapper";

export default function Articles() {
  const { data, isLoading } = { data: null, isLoading: true};
  return (
    <>
      <SectionName title="Straipsniai" showArrow />
      <div className={styles.Container}>
        <div>
          {data && data.length > 0 && (
            <ArticleCard
              title={data[0].title}
              date={data[0].date}
              description={data[0].description}
            />
          )}
        </div>
        <FallbackWrapper data={data} isLoading={isLoading}>
          <div className={styles.GridContainer}>
            {data && data.slice(1, 5).map((article) => (
              <ArticleCard 
                key={article.id}
                title={article.title}
                date={article.createdDate}
              />
            ))}
          </div>
        </FallbackWrapper>
      </div>
      <div className={styles.ButtonContainer}>
        <ReadMoreButton title="Visi straipsniai" path="/Articles" />
      </div>
    </>
  );
}
