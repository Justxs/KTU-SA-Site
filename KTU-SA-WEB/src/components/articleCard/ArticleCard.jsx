import React from "react";
import styles from "./ArticleCard.module.css";
import PropTypes from "prop-types";

export default function ArticleCard(props) {
  const { article, isActive, showPreview } = props;

  return (
    <div className={styles.Card} data-ison={!isActive}>
      <img src={article.thumbnailImageId} alt={article.title} className={styles.Image} data-ison={!isActive}/>
      <div className={styles.Text}>
        <div className={styles.Title}>{article.title}</div>
        <div className={styles.Date} data-ison={!isActive}>
          {article.createdDate}
        </div>
        {showPreview &&
          <div className={styles.Description}>{article.preview}</div>
        }
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    thumbnailImageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool,
  showPreview: PropTypes.bool,
};

ArticleCard.defaultProps = {
  isActive: false,
  showPreview: false,
};
