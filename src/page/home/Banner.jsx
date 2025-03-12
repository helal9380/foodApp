/** @format */

import React, { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageUrl } from "../../util";

const Banner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-10">
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#FFA300",
          "--swiper-pagination-color": "#FFA300",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full max-w-screen rounded-lg overflow-hidden shadow-lg">
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src={getImageUrl(index + 1)}
              className="w-full h-[90vh] object-cover rounded-lg"
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={5}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full max-w-3xl">
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src={getImageUrl(index + 1)}
              className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              alt={`Thumbnail ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
