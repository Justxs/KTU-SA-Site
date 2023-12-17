import React from "react";
import styles from "./Body.module.css";

export default function body(props) {
  const { children } = props;
  return <div className={styles.Container}>{children}</div>;
}
