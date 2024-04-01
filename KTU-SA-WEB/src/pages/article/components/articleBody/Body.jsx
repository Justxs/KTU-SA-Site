/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import styles from './Body.module.css';

export default function Body({ preview, htmlBody, isLoading }) {
  const styledHtmlBody = htmlBody
    .replace(/<a /g, `<a class="${styles.Link}" `)
    .replace(/<p>/g, `<p class="${styles.Paragraph}">`)
    .replace(/<h1>/g, `<h1 class="${styles.Heading}">`);

  if (isLoading) {
    return (
      <div className={styles.Container}>
        <Skeleton className={styles.Paragraph} animation="wave" width={1600} />
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
      </div>
    );
  }

  return (
    <div className={styles.Container}>
      <p className={styles.Paragraph}>{preview}</p>
      <div dangerouslySetInnerHTML={{ __html: styledHtmlBody }} />
    </div>
  );
}

Body.propTypes = {
  preview: PropTypes.string,
  htmlBody: PropTypes.string,
  isLoading: PropTypes.bool,
};

Body.defaultProps = {
  preview: '',
  htmlBody: '',
  isLoading: false,
};
