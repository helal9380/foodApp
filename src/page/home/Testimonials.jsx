/** @format */
import React, { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../components/SectionTitle";
import { getStars } from "../../util";
import "./style.css";

const Testimonials = () => {
  const [reviews, setReviws] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviws(data));
  }, []);
  return (
    <>
      <SectionTitle
        title={"---What Our Clients Say---"}
        subtitle={"TESTIMONIALS"}
      />
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className=" w-2/3 mx-auto space-y-2">
              <div className="flex justify-center items-center mb-5">
                <FaQuoteLeft className="text-4xl" />
              </div>
              {getStars(review.rating)}
              <p>{review.details}</p>
              <h3 className="text-xl uppercase">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Testimonials;
