import React from "react";
import SectionName from "../../../../components/SectionName/SectionName";
import Styles from "./Articles.module.css";
import ArticleCard from "../../../../components/ArticleCard/ArticleCard";

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
