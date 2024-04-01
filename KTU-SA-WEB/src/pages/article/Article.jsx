import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchArticleById } from '../../hooks/useFetchArticleById';
import HeroImage from './components/articleHero/HeroImage';
import Body from './components/articleBody/Body';

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
      <Body 
        preview={article.preview}
        htmlBody={article.htmlBody}
      />
    </>
  );
}
