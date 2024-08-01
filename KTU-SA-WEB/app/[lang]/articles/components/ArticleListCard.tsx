import styles from './ArticleListCard.module.css';
import { getTranslations } from 'next-intl/server';
import { ArticleDto } from '@api/GetArticles';
import Image from 'next/image';
import dateService from '@utils/dateService';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';

type Props = {
  article: ArticleDto,
  isActive: boolean,
}

export default async function ArticleListCard(props : Props) {
  const {
    article,
    isActive
  } = props;

  const t = await getTranslations();

  const width = isActive ? '532' : '400';
  const height = isActive ? '270' : '200';

  const size = isActive ? '28px' : '20px';

  return (
    <div className={styles.Card} >
      <>
        <Image
          src={article.thumbnailImageId}
          alt={article.title}
          className={styles.Image}
          sizes='100%'
          width={0}
          height={height}
        />
        <div className={styles.Text} style={{ width }}>
          <div className={styles.Title} style={{ fontSize: size }}>{article.title}</div>
          <div className={styles.Date} >
            {dateService.formatTimeAgo(article.createdDate, t)}
          </div>
          <div className={styles.Description}>{article.preview}</div>
          <div className={styles.Button}>
            <ReadMoreButton title={t('button.readMore')} path={`/articles/${article.id}`} />
          </div>
        </div>
      </>
    </div>
  );
}
