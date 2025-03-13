/** @format */

import { motion } from "framer-motion";

const ItemCategory = ({ item }) => {
  return (
    <motion.div
      className="flex gap-4 justify-between items-center"
      key={item._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}>
      <motion.img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[100px]"
        src={item.image}
        alt={item.name}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      />
      <div className="space-y-1">
        <h3 className="uppercase">{item.name}</h3>
        <p>{item.recipe}</p>
      </div>
      <p className="text-[#FFA300]">${item.price}</p>
    </motion.div>
  );
};

export default ItemCategory;
