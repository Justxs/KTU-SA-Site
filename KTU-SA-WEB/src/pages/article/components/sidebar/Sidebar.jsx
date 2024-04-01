import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-scroll';
import styles from './Sidebar.module.css';
import FacebookShare from '../../../../components/shareButtons/FacebookShare';
import LinkedInShare from '../../../../components/shareButtons/LinkedInShare';
import stringService from '../../../../services/stringService';

export default function Sidebar({ article }) {
  const { t } = useTranslation();
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
      <div className={styles.Container}>
        <div className={styles.Text}>{t('common.content')}</div>
        <div className={styles.Content}>
          {article.contentList.map((content) => (
            <div key={content} className={styles.List}>
              <ArrowForwardIcon sx={{ color: '#4A9FE6' }} />
              <Link
                className={styles.ListText}
                to={stringService.transformTextToId(content)}
                spy
                smooth
              >
                {content}
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.Text}>{t('common.share')}</div>
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
