/** @format */

import React from "react";
import Banner from "./Banner";
import BistroBoss from "./BistroBoss";
import CallUsSection from "./CallUsSection";
import Category from "./Category";
import ChefRecommend from "./ChefRecommend";
import Feature from "./Feature";
import Navbar from "./Navbar";
import OurMeno from "./OurMeno";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="max-w-[1140px] mx-auto">
        <Category />
        <BistroBoss />
        <OurMeno />
        <CallUsSection />
        <ChefRecommend />
        <Feature />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
