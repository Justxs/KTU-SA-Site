import { Skeleton } from '@mui/material';
import React from 'react';
import styles from './SkeletonParagraphs.module.css';

export default function SkeletonParagraphs() {
  return (
    <>
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
      <Skeleton className={styles.Paragraph} animation="wave" />
    </>
  );
}
