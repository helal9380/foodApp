/** @format */
import React from "react";
import bistroBossImg from "../../assets/chef-service.jpg";

const BistroBoss = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bistroBossImg})`,
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className=" flex justify-center items-center h-[333px] bg-gray-200 text-black rounded-tl-full rounded-br-full">
          <div className="w-3xl">
            <h1 className="mb-5 text-5xl font-bold uppercase">Bistro Boss</h1>
            <p className="mb-5 w-[600px] mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, libero accusamus laborum deserunt ratione dolor
              officiis praesentium! Deserunt magni aperiam dolor eius dolore at,
              nihil iusto ducimus incidunt quibusdam nemo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BistroBoss;
