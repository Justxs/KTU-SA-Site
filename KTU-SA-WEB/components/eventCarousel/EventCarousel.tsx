"use client";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import { EventPreviewDto } from "@api/GetEvents";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import EventCard from "./EventCard";

type Props = {
  events: Array<EventPreviewDto>;
};

export default function EventCarousel({ events }: Readonly<Props>) {
  const settings: Settings = {
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
          dots: true,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          prevArrow: undefined,
          nextArrow: undefined,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "90%", mb: "40px" }}>
      <Slider {...settings} key={events.length}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Slider>
    </Box>
  );
}
