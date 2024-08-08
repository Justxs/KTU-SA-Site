'use client';

import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import styles from './EventCarousel.module.css';
import { EventPreviewDto } from '@api/GetEvents';
import Image from 'next/image';
import dateService from '@utils/dateService';
import { useRouter } from 'next/navigation';

type Props = {
  className?: string; 
  style?: React.CSSProperties; 
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; 
}

function NextArrow(props : Props) {
  const { className, style, onClick } = props;

  if (className?.includes('slick-disabled')) {
    return null;
  }

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ArrowRight}>
        <ArrowRight style={{ fontSize: '100px' }} />
      </div>
    </div>
  );
}

function PrevArrow(props : Props) {
  const { className, style, onClick } = props;

  if (className?.includes('slick-disabled')) {
    return null;
  }

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ArrowLeft}>
        <ArrowLeft style={{ fontSize: '100px' }} />
      </div>
    </div>
  );
}

export default function EventCarousel({ events } : { events : Array<EventPreviewDto> }) {
  const router = useRouter();
  const settings : Settings = {
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: Math.min(3, events.length),
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dots: true,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: Math.min(2, events.length),
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          prevArrow: undefined,
          nextArrow: undefined,
          dots: true
        }
      }
    ]
  };

  return (
    <div className={styles.Container}>
      {events.length !== 1
        ? (
          <Slider {...settings} key={events.length}>
            {events.map((event) => (
              <div key={event.id}>
                <div className={styles.CardContainer}>
                  <button
                    className={styles.Card}
                    onClick={() => router.push(`/events/${event.id}`)}
                    type="button"
                  >
                    <Image
                      src={event.coverImageUrl}
                      alt={event.title}
                      className={styles.Image}
                      width={0}
                      height={0}
                      sizes='100%'
                    />
                    <b className={styles.Title}>
                      {event.title}
                    </b>
                    <div className={styles.Date}>
                      {dateService.formatToDateAndTime(event.startDate)}
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        )
        : (
          <div key={events[0].id}>
            <div className={styles.CardContainer}>
              <button
                className={styles.Card}
                onClick={() => router.push(`/events/${events[0].id}`)}
                type="button"
              >
                <Image
                  src={events[0].coverImageUrl}
                  alt={events[0].title}
                  className={styles.Image}
                  width={0}
                  height={0}
                  sizes='100%'
                />
                <b className={styles.Title}>
                  {events[0].title}
                </b>
                <div className={styles.Date}>
                  {dateService.formatToDateAndTime(events[0].startDate)}
                </div>
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

