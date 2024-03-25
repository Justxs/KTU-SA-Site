import React from 'react';
import styles from "./EventCarousel.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

const slides = [
  {
    title: 'Renginio pavadinimas 1',
    date: '2023-10-10 18:00',
    imgPath: 'https://source.unsplash.com/random/1',
  },
  {
    title: 'Renginio pavadinimas 2',
    date: '2023-10-10 18:00',
    imgPath: 'https://source.unsplash.com/random/2',
  },
  {
    title: 'Renginio pavadinimas 3',
    date: '2023-10-10 18:00',
    imgPath: 'https://source.unsplash.com/random/3',
  },
  {
    title: 'Renginio pavadinimas 4',
    date: '2023-10-10 18:00',
    imgPath: 'https://source.unsplash.com/random/4',
  },
  {
    title: 'Renginio pavadinimas 5',
    date: '2023-10-10 18:00',
    imgPath: 'https://source.unsplash.com/random/5',
  },
  {
    title: 'Renginio pavadinimas 6',
    date: '2023-10-10 18:00',
    imgPath: 'https://source.unsplash.com/random/6',
  },
];

function SampleNextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <div className={styles.ArrowRight}>
        <ArrowRight style={{ fontSize: '100px' }}/>
      </div>
    </div>
  );
}
  
function SamplePrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <div className={styles.ArrowLeft}>
        <ArrowLeft style={{ fontSize: '100px' }}/>
      </div>
    </div>
  );
}
  
export default function EventCarousel() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow to="prev"/>,
    nextArrow: <SampleNextArrow to="next"/>,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          autoplay: true,
          prevArrow: <></>,
          nextArrow: <></>,
          dots: true,
        }
      }
    ]
  };

  return (
    <div className={styles.Container}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} >
            <div className={styles.CardContainer}>
              <div className={styles.Card}>
                <img 
                  src={slide.imgPath} 
                  alt={slide.title} 
                  className={styles.Image}
                />
                <b className={styles.Title}>
                  {slide.title}
                </b>
                <div className={styles.Date}>
                  {slide.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}