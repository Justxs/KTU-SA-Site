import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactCard.module.css";

export default function ContactCard(props) {
  const { photo, name, position } = props;
  return (
    <div className={styles.Container}>
      <img className={styles.Image} src={photo} />
      <p className={styles.Position}>{position}</p>
      <p className={styles.Name}>{name}</p>
    </div>
  );
}

ContactCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};
