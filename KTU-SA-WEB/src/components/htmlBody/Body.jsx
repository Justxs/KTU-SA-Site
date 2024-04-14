/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Body.module.css';
import SkeletonParagraphs from '../skeletonComponents/SkeletonParagraphs';

export default function Body({ htmlBody, isLoading }) {
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
    <div dangerouslySetInnerHTML={{ __html: styledHtmlBody }} />
  );
}

Body.propTypes = {
  htmlBody: PropTypes.string,
  isLoading: PropTypes.bool,
};

Body.defaultProps = {
  htmlBody: '',
  isLoading: false,
};
