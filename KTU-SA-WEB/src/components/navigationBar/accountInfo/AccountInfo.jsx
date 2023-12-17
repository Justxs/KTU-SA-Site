import React from "react";
import PropTypes from "prop-types";
import styles from "./AccountInfo.module.css";

export default function AccountInfo(props) {
  const { role, saUnit } = props;
  return (
    <div className={styles.Container}>
      <b>Account info:</b>
      <div>
        <b>Role:</b> {role}
      </div>
      <div>
        <b>SA unit:</b> {saUnit}
      </div>
    </div>
  );
}

AccountInfo.propTypes = {
  role: PropTypes.string.isRequired,
  saUnit: PropTypes.string.isRequired,
};
