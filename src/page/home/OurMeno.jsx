/** @format */

import { useEffect, useState } from "react";
import ItemCategory from "../../components/ItemCategory";
import SectionTitle from "../../components/SectionTitle";

const OurMeno = () => {
  const [menu, setMemo] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) =>
        setMemo(data.filter((item) => item.category === "popular"))
      );
  }, []);
  console.log(menu);
  return (
    <div className="mb-10">
      <SectionTitle
        title={"---Check it out---"}
        subtitle={"FROM OUR MENU"}
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
        <button className="btn hover:bg-[#FFA300]">View Full Menu</button>
      </div>
    </div>
  );
};

export default OurMeno;
