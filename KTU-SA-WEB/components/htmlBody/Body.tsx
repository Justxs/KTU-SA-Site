import styles from './Body.module.css';

export default function Body({ htmlBody } : { htmlBody : string }) {
  const styledHtmlBody = htmlBody
    .replace(/<h1 /g, `<h2 class="${styles.Heading}" `)
    .replace(/<a /g, `<a class="${styles.Link}" `)
    .replace(/<p/g, `<p class="${styles.Paragraph}"`)
    .replace(/<iframe/g, `<div class="${styles.Video}"><iframe  width="560" height="315" `)
    .replace(/<\/iframe>/g, '</iframe></div>');

  return (
    <div
      dangerouslySetInnerHTML={{ __html: styledHtmlBody }}
      className={styles.Margin}
    />
  );
}
