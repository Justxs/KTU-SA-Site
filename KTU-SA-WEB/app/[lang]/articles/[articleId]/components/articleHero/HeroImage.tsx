import dateService from '@utils/dateService';
import styles from './HeroImage.module.css';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

type Props = {
  img: string,
  title: string,
  date: Date,
  readingTime: string,
}

export default async function HeroImage(props : Props) {
  const {
    img,
    title,
    date,
    readingTime
  } = props;

  const t = await getTranslations();

  return (
    <div className={styles.Container}>
      <Image 
        className={styles.Image} 
        alt={title} 
        src={img} 
        sizes='100%'
        width={0}
        height={0}
      />
      <div className={styles.TextContainer}>
        <h1 className={styles.Title}>{title}</h1>
        <div className={styles.Info}>
          <div>{dateService.formatToDate(date)}</div>
          <div>
            {t('article.readingTime')}
            {' '}
              -
            {' '}
            {readingTime}
          </div>
        </div>
      </div>
    </div>
  );
}
