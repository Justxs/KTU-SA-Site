import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './EmptyData.module.css';
import GoBackButton from '../goBackButton/GoBackButton';

export default function EmptyData({ length }) {
  const { t } = useTranslation();

  if (length !== 0) {
    return null;
  }

  return (
    <>
      <h2 className={styles.Header}>{t('common.noData')}</h2>
      <p className={styles.Header}>{t('common.tryAgain')}</p>
      <div className={styles.Icon}>
        <GoBackButton />
      </div>
    </>
  );
}

EmptyData.propTypes = {
  length: PropTypes.number,
};

EmptyData.defaultProps = {
  length: 1,
};
