import React from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import Styles from "./Articles.module.css";
import ArticleCard from "../../../../components/articleCard/ArticleCard";

export default function Articles() {
  return (
    <>
      <SectionName title="Straipsniai" />
      <div className={Styles.Container}>
        <ArticleCard />
      </div>
    </>
  );
}
