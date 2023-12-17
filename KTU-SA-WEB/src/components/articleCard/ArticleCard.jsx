import React from "react";
import styles from "./ArticleCard.module.css";
import PlaceHolder from "../../assets/placeholder.png";
import PropTypes from "prop-types";

export default function ArticleCard(props) {
  const { image, title, date, description } = props;

  return (
    <div className={styles.Card} data-isOn={description === null}>
      <img src={image} alt={title} className={styles.Image} />
      <div className={styles.Text}>
        <p className={styles.Title}>{title}</p>
        <p className={styles.Date} data-isOn={description === null}>
          {date}
        </p>
        <p className={styles.Description}>{description}</p>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ArticleCard.defaultProps = {
  image: PlaceHolder,
  description: null,
};
