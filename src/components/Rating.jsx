/** @format */
import React from "react";
import Star from "../assets//star.svg";

const Rating = ({ value }) => {
  const stars = Array(value).fill(Star);
  return (
    <>
      {stars.map((star, index) => (
        <img
          key={index}
          src={star}
          whidh="24px"
          hight="24"
        />
      ))}
    </>
  );
};

export default Rating;
