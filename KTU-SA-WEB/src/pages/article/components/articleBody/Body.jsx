import React from 'react';
import PropTypes from 'prop-types';
import styles from './Body.module.css';

export default function Body({ preview, htmlBody }) {
  const styledHtmlBody = htmlBody
    .replace(/<a /g, `<a class="${styles.Link}" `)
    .replace(/<p>/g, `<p class="${styles.Paragraph}">`)
    .replace(/<h1>/g, `<h1 class="${styles.Heading}">`);

  return (
    <div className={styles.Container}>
      <p className={styles.Paragraph}>{preview}</p>
      <div dangerouslySetInnerHTML={{ __html: styledHtmlBody }} />
    </div>
  );
}

Body.propTypes = {
  preview: PropTypes.string.isRequired,
  htmlBody: PropTypes.string.isRequired,
};
