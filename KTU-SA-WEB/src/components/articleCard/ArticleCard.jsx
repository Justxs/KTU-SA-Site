import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import dateService from '../../services/dateService';
import styles from './ArticleCard.module.css';

export default function ArticleCard(props) {
  const {
    article,
    isActive,
    showPreview,
    skeleton,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      className={styles.Card}
      data-ison={!isActive}
      onClick={() => navigate(`/articles/${article.id}`)}
      type="button"
    >
      {!skeleton
        ? (
          <>
            <img src={article.thumbnailImageId} alt="" className={styles.Image} />
            <div className={styles.Text}>
              <div className={styles.Title}>{article.title}</div>
              <div className={styles.Date} data-ison={!isActive}>
                {dateService.formatTimeAgo(article.createdDate, t)}
              </div>
              {showPreview
              && <div className={styles.Description}>{article.preview}</div>}
            </div>
          </>
        )
        : (
          <>
            <div className={styles.Image}>
              <Skeleton ariant="rounded" height={300} animation="wave" />
            </div>
            <div className={styles.Text}>
              <div className={styles.Title}><Skeleton ariant="text" animation="wave" /></div>
              <div className={styles.Date} data-ison={!isActive}>
                <Skeleton ariant="text" width={100} animation="wave" />
              </div>
              {showPreview
              && (
              <div className={styles.Description}>
                <Skeleton ariant="text" width={400} animation="wave" />
              </div>
              )}
            </div>
          </>
        )}
    </button>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    thumbnailImageId: PropTypes.string,
    title: PropTypes.string,
    createdDate: PropTypes.string,
    preview: PropTypes.string,
  }).isRequired,
  skeleton: PropTypes.bool,
  isActive: PropTypes.bool,
  showPreview: PropTypes.bool,
};

ArticleCard.defaultProps = {
  skeleton: false,
  isActive: false,
  showPreview: false,
};
