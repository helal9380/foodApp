/** @format */
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import SectionTitle from "../../components/SectionTitle";
import { getCategoryImageUrl } from "../../util";

const Category = () => {
  return (
    <div className="py-10 bg-gray-100">
      <SectionTitle
        title={"---From 11:00am to 10:00pm---"}
        subtitle={"ORDER ONLINE"}
        className="text-center mb-8"
      />
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper">
        {[...Array(5)].map((_, index) => (
          <SwiperSlide
            key={index + 1}
            className="flex justify-center">
            <img
              src={getCategoryImageUrl(index + 1)}
              className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
