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
import styles from './EventCarousel.module.css';
import dateService from '../../services/dateService';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <div className={styles.ArrowRight}>
        <ArrowRight style={{ fontSize: '100px' }} />
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style }}
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

  // TODO HANDLE 1 Event count
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow to="prev" />,
    nextArrow: <SampleNextArrow to="next" />,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          initialSlide: 0,
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
      <Slider {...settings}>
        {isLoading === false
        && events
        && events.map((event) => (
          <div key={event.id}>
            <div className={styles.CardContainer}>
              <button
                className={styles.Card}
                onClick={() => navigate(`/events/${event.id}`)}
                type="button"
              >
                <img
                  src={event.thumbnailImageId}
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
    </div>
  );
}

EventCarousel.propTypes = {
  events: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
