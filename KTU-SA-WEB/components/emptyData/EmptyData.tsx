'use client';

import GoBackButton from '@components/goBackButton/GoBackButton';
import styles from './EmptyData.module.css';
import { useTranslations } from 'next-intl';

export default function EmptyData({ length = 1 } : { length : number }) {
  const t = useTranslations();

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


