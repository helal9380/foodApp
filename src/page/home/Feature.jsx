/** @format */
import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import featureImg from "../../assets/featured.jpg";
import SectionTitle from "../../components/SectionTitle";
import "./style.css";

const Feature = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="featured pt-1 mb-5 pb-5 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div>
        <SectionTitle
          title={"---Check it out---"}
          subtitle={"FROM OUR MENU"}
        />
        <div className="flex gap-5 justify-between px-20">
          <motion.img
            className="w-1/2 rounded-lg"
            src={featureImg}
            alt=""
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="space-y-2 mt-10"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            <h4>March 20, 2023</h4>
            <h3>WHERE CAN I GET SOME?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <motion.button
              className="btn bg-[#FFA300] btn-xs sm:btn-sm md:btn-md mt-10 border-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Feature;
