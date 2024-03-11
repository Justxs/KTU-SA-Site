import React from "react";
import styles from "./ArticleCard.module.css";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";

export default function ArticleCard(props) {
  const { 
    article,
    isActive,
    showPreview,
    skeleton 
  } = props;

  return (
    <div className={styles.Card} data-ison={!isActive}>
      {!skeleton 
        ? <>
          <img src={article.thumbnailImageId} alt={article.title} className={styles.Image} />
          <div className={styles.Text}>
            <div className={styles.Title}>{article.title}</div>
            <div className={styles.Date} data-ison={!isActive}>
              {article.createdDate}
            </div>
            {showPreview &&
              <div className={styles.Description}>{article.preview}</div>
            }
          </div>
        </> 
        :<>
          <div className={styles.Image}>
            <Skeleton ariant="rounded" width={500} height={300}/>
          </div>
          <div className={styles.Text}>
            <div className={styles.Title}><Skeleton ariant="text"/></div>
            <div className={styles.Date} data-ison={!isActive}>
              <Skeleton ariant="text" width={100}/>
            </div>
            {showPreview &&
                <div className={styles.Description}><Skeleton ariant="text" width={400}/></div>
            }
          </div>
        </>
      }
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    thumbnailImageId: PropTypes.string,
    title: PropTypes.string.isRequired,
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
