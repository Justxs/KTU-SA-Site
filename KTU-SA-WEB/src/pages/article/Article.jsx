import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFetchArticleById } from '../../hooks/useFetchArticleById';
import HeroImage from './components/articleHero/HeroImage';
import Body from '../../components/htmlBody/Body';
import styles from './Article.module.css';
import Sidebar from './components/sidebar/Sidebar';
import { useSnackbarContext } from '../../context/SnackbarContext';

export default function Article() {
  const { articleId } = useParams();
  const { data: article, isLoading, error } = useFetchArticleById(articleId);
  const { openSnackbar } = useSnackbarContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (error) {
    openSnackbar(t('common.notFound'));
    navigate('/');
  }

  if (isLoading) {
    return (
      <>
        <HeroImage
          isLoading
        />
        <div className={styles.Container}>
          <Body
            isLoading
          />
        </div>
      </>
    );
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
        <Sidebar article={article} />
        <Body
          htmlBody={article.htmlBody}
        />
      </div>
    </>
  );
}
