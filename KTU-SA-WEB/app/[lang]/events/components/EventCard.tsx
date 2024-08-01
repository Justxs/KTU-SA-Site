import Image from 'next/image';
import styles from './EventCard.module.css';
import { getTranslations } from 'next-intl/server';
import dateService from '@utils/dateService';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import { EventPreviewDto } from '@api/GetEvents';

type Props = {
  event: EventPreviewDto,
  isActive: boolean
}

export default async function EventCard(props : Props) {
  const {
    event,
    isActive
  } = props;

  const t = await getTranslations();

  const color = isActive ? '#FFD324' : undefined;
  const dateColor = isActive ? '#A46304' : '#8C9BA4';

  const width = isActive ? '532' : '400';
  const height = isActive ? '270' : '200';

  const size = isActive ? '28' : '20';

  return (
    <div className={styles.Card} style={{ backgroundColor: color }}>
      <Image
        src={event.coverImageUrl}
        alt={event.title}
        className={styles.Image}
        width={width}
        height={height}
      />
      <div className={styles.Text} style={{ maxWidth: width }}>
        <div className={styles.Title} style={{ fontSize: size }}>{event.title}</div>
        <div className={styles.Date} style={{ color: dateColor }}>
          {dateService.formatToDateAndTime(event.startDate)}
        </div>
        <div className={styles.Button}>
          <ReadMoreButton title={t('button.readMore')} path={`/events/${event.id}`} />
        </div>
      </div>
    </div>
  );
}


