import React from "react";
import styles from "./HeroImage.module.css";
import PropTypes from "prop-types";
import PlaceHolder from "../../assets/placeholder2.png";

export default function HeroImage(props) {
  const { title, description } = props;
  return (
    <div className={styles.Container}>
      <div className={styles.TextContainer}>
        <div className={styles.Text}>
          <h1 className={styles.Title}>{title}</h1>
          <p className={styles.Description}>{description}</p>
        </div>
        <div className={styles.HeroImageContainer}>
          <img className={styles.HeroImage} src={PlaceHolder} />
        </div>
        <div className={styles.Divder}></div>
      </div>
    </div>
  );
}

HeroImage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
