import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import styles from './SpinnerLoading.module.css';

export default function SpinnerLoading({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <CircularProgress
        size="200px"
      />
    </div>
  );
}

SpinnerLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
