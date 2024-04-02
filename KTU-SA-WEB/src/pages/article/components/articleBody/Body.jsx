/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Body.module.css';
import SkeletonParagraphs from '../../../../components/skeletonComponents/SkeletonParagraphs';

export default function Body({ preview, htmlBody, isLoading }) {
  const styledHtmlBody = htmlBody
    .replace(/<a /g, `<a class="${styles.Link}" `)
    .replace(/<p>/g, `<p class="${styles.Paragraph}">`)
    .replace(/<h1>/g, `<h1 class="${styles.Heading}">`);

  if (isLoading) {
    return (
      <div>
        <SkeletonParagraphs />
      </div>
    );
  }

  return (
    <div>
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
