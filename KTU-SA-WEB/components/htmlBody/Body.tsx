import styles from './Body.module.css';

export default function Body({ htmlBody }: Readonly<{ htmlBody: string }>) {
  const styledHtmlBody = htmlBody
    .replaceAll('<h1 ', `<h2 class="${styles.Heading}" `)
    .replaceAll('<h2 ', `<h2 class="${styles.Heading}" `)
    .replaceAll('<h3 ', `<h3 class="${styles.SubHeading}" `)
    .replaceAll('<a ', `<a class="${styles.Link}" `)
    .replaceAll('<p', `<p class="${styles.Paragraph}"`)
    .replaceAll('<iframe', `<div class="${styles.Video}"><iframe width="560" height="315" `)
    .replaceAll('</iframe>', '</iframe></div>');

  return <div dangerouslySetInnerHTML={{ __html: styledHtmlBody }} className={styles.Body} />;
}
