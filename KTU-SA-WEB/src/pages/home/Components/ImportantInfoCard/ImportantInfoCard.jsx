import React from "react";
import styles from "./ImportantInfoCard.module.css";
import { blue } from "@mui/material/colors";
import PropTypes from "prop-types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ImportantInfoCard(props) {
  const { color, header, description, hot } = props;

  return (
    <div style={{ background: blue[color] }} className={styles.Container}>
      {hot && (
        <div className={styles.HotContainer}>
          <p className={styles.Hot}>HOT!</p>
        </div>
      )}
      <div className={styles.Text}>
        <p className={styles.Header}>{header}</p>
        <p className={styles.Description}>{description}</p>
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.Button}>
          <ArrowForwardIcon sx={{ color: blue[900], width: "18px" }} />
        </div>
      </div>
    </div>
  );
}

export default ImportantInfoCard;

ImportantInfoCard.propTypes = {
  color: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hot: PropTypes.bool,
};

ImportantInfoCard.defaultProps = {
  hot: false,
};
