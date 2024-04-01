import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './ArticleListCard.module.css';
import dateService from '../../../services/dateService';
import ReadMoreButton from '../../../components/readMoreButton/ReadMoreButton';

export default function ArticleListCard(props) {
  const {
    article,
    isActive,
    skeleton,
  } = props;

  const { t } = useTranslation();

  const color = isActive ? '#FFD324' : null;
  const dateColor = isActive ? '#A46304' : '#8C9BA4';

  const width = isActive ? '532px' : '400px';
  const height = isActive ? '270px' : '200px';

  const size = isActive ? '28px' : '20px';

  return (
    <div className={styles.Card} style={{ backgroundColor: color }}>
      {!skeleton
        ? (
          <>
            <img
              src={article.thumbnailImageId}
              alt={article.title}
              className={styles.Image}
              width={width}
              height={height}
            />
            <div className={styles.Text} style={{ width }}>
              <div className={styles.Title} style={{ fontSize: size }}>{article.title}</div>
              <div className={styles.Date} style={{ color: dateColor }}>
                {dateService.formatTimeAgo(article.createdDate, t)}
              </div>
              <div className={styles.Description}>{article.preview}</div>
              <div className={styles.Button}>
                <ReadMoreButton title={t('button.readMore')} path={`/articles/${article.id}`} />
              </div>
            </div>
          </>
        )
        : (
          <>
            <div className={styles.Image}>
              <Skeleton variant="rounded" width={width} height={height} animation="wave" />
            </div>
            <div className={styles.Text}>
              <div className={styles.Title}>
                <Skeleton animation="wave" />
              </div>
              <Skeleton className={styles.Date} width={100} animation="wave" />
              <Skeleton className={styles.Description} width={400} animation="wave" />
            </div>
          </>
        )}
    </div>
  );
}

ArticleListCard.propTypes = {
  article: PropTypes.shape({
    thumbnailImageId: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    createdDate: PropTypes.string,
    preview: PropTypes.string,
  }).isRequired,
  skeleton: PropTypes.bool,
  isActive: PropTypes.bool,
};

ArticleListCard.defaultProps = {
  skeleton: false,
  isActive: false,
};
