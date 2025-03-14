/** @format */

import React from "react";

const Cover = ({ img, title, description }) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${img})`,
      }}>
      <div className="hero-overlay "></div>
      <div className="w-xl px-20 py-10 bg-black opacity-50 text-neutral-content text-center">
        <div className="max-w-xl">
          <h1 className="mb-2 text-5xl font-bold">{title}</h1>
          <p className="mb-5">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
