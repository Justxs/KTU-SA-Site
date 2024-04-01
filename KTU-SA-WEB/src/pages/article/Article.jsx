import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchArticleById } from '../../hooks/useFetchArticleById';
import HeroImage from './components/articleHero/HeroImage';
import Body from './components/articleBody/Body';
import Sidebar from './components/sidebar/Sidebar.jsx';
import styles from './Article.module.css';

export default function Article() {
  const { articleId } = useParams();
  const { data: article, isLoading, error } = useFetchArticleById(articleId);

  if(isLoading || error){
    return null;
  }

  return (
    <>
      <HeroImage 
        img={article.thumbnailImageId}
        title={article.title}
        date={article.createdDate}
        readingTime={article.readingTime}
      />
      <div className={styles.Container}>
        <Sidebar article={article}/>
        <Body 
          preview={article.preview}
          htmlBody={article.htmlBody}
        />
      </div>
    </>
  );
}
