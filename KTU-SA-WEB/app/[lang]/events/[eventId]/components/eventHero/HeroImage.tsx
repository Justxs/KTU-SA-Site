import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import styles from './HeroImage.module.css';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

type Props = {
  img: string,
  title: string,
  ticketUrl?: string
}

export default async function HeroImage(props : Props) {
  const {
    img,
    title,
    ticketUrl
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
        {ticketUrl !== null
          && (
            <div className={styles.Tickets}>
              <LocalActivityIcon sx={{ height: '30px', width: '30px' }} />
              <a className={styles.TicketUrl} href={ticketUrl}>{t('event.buyTickets')}</a>
            </div>
          )}
      </div>
    </div>
  );
}
