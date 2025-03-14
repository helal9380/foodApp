/** @format */

import { Link } from "react-router";

import ItemCategory from "./ItemCategory";
const CetegorySection = ({ menu, name }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        {menu.map((item) => (
          <ItemCategory
            key={item._id}
            item={item}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={`/shop/${name}`}
          className="btn hover:bg-[#FFA300]">
          ORDER NOW
        </Link>
      </div>
    </div>
  );
};

export default CetegorySection;
