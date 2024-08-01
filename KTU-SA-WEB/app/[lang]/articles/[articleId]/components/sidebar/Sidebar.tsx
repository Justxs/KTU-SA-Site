import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './Sidebar.module.css';
import { getTranslations } from 'next-intl/server';
import { ArticleContentDto } from '@api/GetArticles';
import FacebookShare from '@components/shareButtons/FacebookShare';
import LinkedInShare from '@components/shareButtons/LinkedInShare';
import stringService from '@utils/stringService';
import Link from 'next/link';

export default async function Sidebar({ article } : { article : ArticleContentDto }) {
  const t = await getTranslations();

  return (
    <>
      <div className={styles.Container}>
        {article.contentList && article.contentList.length !== 0 && (
          <>
            <div className={styles.Text}>{t('common.content')}</div>
            <div className={styles.Content}>
              {article.contentList.map((content : string) => (
                <div key={content} className={styles.List}>
                  <ArrowForwardIcon sx={{ color: '#4A9FE6' }} />
                  <Link
                    className={styles.ListText}
                    href={stringService.transformTextToId(content)}
                  >
                    {content}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
        {/* <div className={styles.Text}>{t('common.share')}</div>*/}
        <div className={styles.Icons}>
          {/* TODO ADD share*/}
        </div>
      </div>
    </>
  );
}

