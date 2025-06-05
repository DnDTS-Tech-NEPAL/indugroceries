"use client";

import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

// import { useWindowSize } from "@/hooks/app";
import { SwiperProps } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./swiper.css";

export const Swiper = ({ slides, direction }: SwiperProps) => {
  // const { width } = useWindowSize();
  // const direction = width < 1024 ? "horizontal" : "vertical";
  return (
    <SwiperReact
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true, currentClass: "swiper-bullet" }}
      direction={direction}
      speed={500}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        // pauseOnMouseEnter: true,
      }}
      loop
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </SwiperReact>
  );
};
