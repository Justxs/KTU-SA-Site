/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import styles from './EventCarousel.module.css';
import dateService from '../../services/dateService';

function NextArrow(props) {
  const { className, style, onClick } = props;

  if (className.includes('slick-disabled')) {
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

function PrevArrow(props) {
  const { className, style, onClick } = props;

  if (className.includes('slick-disabled')) {
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

export default function EventCarousel({ events, isLoading }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={styles.Container} style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  const settings = {
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: Math.min(3, events.length),
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: Math.min(2, events.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          prevArrow: null,
          nextArrow: null,
          dots: true,
        },
      },
    ],
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
                    onClick={() => navigate(`/events/${event.id}`)}
                    type="button"
                  >
                    <img
                      src={event.coverImageUrl}
                      alt={event.title}
                      className={styles.Image}
                    />
                    <b className={styles.Title}>
                      {event.title}
                    </b>
                    <div className={styles.Date}>
                      {dateService.formatToDateAndTime(event.date)}
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
                onClick={() => navigate(`/events/${events[0].id}`)}
                type="button"
              >
                <img
                  src={events[0].coverImageUrl}
                  alt={events[0].title}
                  className={styles.Image}
                />
                <b className={styles.Title}>
                  {events[0].title}
                </b>
                <div className={styles.Date}>
                  {dateService.formatToDateAndTime(events[0].date)}
                </div>
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

EventCarousel.propTypes = {
  events: PropTypes.instanceOf(Object),
  isLoading: PropTypes.bool.isRequired,
};

EventCarousel.defaultProps = {
  events: null,
};
