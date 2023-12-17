import React from "react";
import styles from "./Body.module.css";
import PropTypes from "prop-types";

export default function Body(props) {
  const { children } = props;
  return <div className={styles.Container}>{children}</div>;
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
};
