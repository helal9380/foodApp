/** @format */

import React, { useEffect, useState } from "react";
import ChefRecommendCard from "../../components/ChefRecommendCard";
import SectionTitle from "../../components/SectionTitle";

const ChefRecommend = () => {
  const [chefRecommends, setChefRecommend] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) =>
        setChefRecommend(data.filter((item) => item.category === "salad"))
      );
  }, []);

  return (
    <div>
      <SectionTitle
        title={"---Should Try---"}
        subtitle={"CHEF RECOMMENDS"}
      />
      <div className="grid grid-cols-3 gap-5">
        {chefRecommends.slice(0, 3).map((item) => (
          <ChefRecommendCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ChefRecommend;
