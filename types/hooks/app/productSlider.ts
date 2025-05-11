import { Swiper as SwiperType } from "swiper";

export type ProductSliderProps = {
  setSwiper: (swiper: SwiperType) => void;
  setIsBeginning: (isBeginning: boolean) => void;
  setIsEnd: (isEnd: boolean) => void;
};
