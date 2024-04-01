import React from 'react';
import PropTypes from 'prop-types';
import styles from './Body.module.css';

export default function Body(props) {
  const { children } = props;
  return <div className={styles.Container}>{children}</div>;
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
};
