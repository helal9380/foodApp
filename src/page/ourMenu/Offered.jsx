/** @format */
import React from "react";
import { Link } from "react-router";
import ItemCategory from "../../components/ItemCategory.jsx";
import SectionTitle from "../../components/SectionTitle.jsx";
const Offered = ({ menu, name }) => {
  return (
    <div>
      <SectionTitle
        title={"---Dont miss---"}
        subtitle={"TODAYS OFFER"}
      />
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

export default Offered;
