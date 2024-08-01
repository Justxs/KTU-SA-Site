import Link from 'next/link';
import styles from './ArticleCard.module.css';
import Image from 'next/image';
import dateService from '@utils/dateService';
import { getTranslations } from 'next-intl/server';

type ArticleDto = {
  id: string;
  title: string;
  preview: string;
  createdDate: Date;
  thumbnailImageId: string;
};

type Props = {
  article: ArticleDto;
  isActive?: boolean;
  showPreview?: boolean;
}

export default async function ArticleCard(props : Props) {
  const {
    article,
    isActive = false,
    showPreview = false
  } = props;
  const t = await getTranslations();

  return (
    <Link
      href={`/articles/${article.id}`}
      className={styles.Card}
      data-ison={!isActive}
      type="button"
    >
      <Image 
        src={article.thumbnailImageId} 
        className={styles.Image} 
        alt={article.title}
        sizes='100%'
        width={0}
        height={0}
      />
      <div className={styles.Text}>
        <div className={styles.Title}>{article.title}</div>
        <div className={styles.Date} data-ison={!isActive}>
          {dateService.formatTimeAgo(article.createdDate, t)}
        </div>
        {showPreview && 
          <div className={styles.Description}>{article.preview}</div>
        }
      </div>
    </Link>
  );
}
