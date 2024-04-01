import React from 'react';
import PropTypes from 'prop-types';
import LinkedInShare from '../../../../components/shareButtons/LinkedInShare';
import FacebookShare from '../../../../components/shareButtons/FacebookShare';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.css';

export default function Sidebar({article}) {
  const {t} = useTranslation();
  const location = useLocation();
  const currentUrl = window.location.origin + location.pathname;
  
  return (
    <>
      <Helmet>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.preview} />
        <meta property="og:image" content={article.thumbnailImageId} />
      </Helmet>
      <div>
        <p>{t('common.share')}</p>
        <div className={styles.Icons}>
          <FacebookShare 
            currentUrl={currentUrl}
          />
          <LinkedInShare
            title={article.title}
            preview={article.preview}
            currentUrl={currentUrl}
          />
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};
