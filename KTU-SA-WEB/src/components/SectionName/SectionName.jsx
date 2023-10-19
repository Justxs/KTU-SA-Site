import React from "react";
import ArrowIcon from "../../assets/Arrow.svg";
import Styles from "./SectionName.module.css";
import PropTypes from "prop-types";

export default function SectionName({ title, showArrow }) {
  return (
    <div className={Styles.Container}>
      <p className={Styles.Header}>{title}</p>
      {showArrow && <img src={ArrowIcon} className={Styles.Arrow} />}
    </div>
  );
}

SectionName.propTypes = {
  title: PropTypes.string.isRequired,
  showArrow: PropTypes.bool,
};

SectionName.defaultProps = {
  showArrow: true,
};
