/** @format */

import ItemCategory from "../../components/ItemCategory";
import Loading from "../../components/Loading";
import SectionTitle from "../../components/SectionTitle";
import useMenu from "../../hook/useMenu";

const OurMeno = () => {
  const { menu, isLoading } = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <div className="mb-10">
      <SectionTitle
        title={"---Check it out---"}
        subtitle={"FROM OUR MENU"}
      />
      <div className="grid grid-cols-2 gap-5 mb-5">
        {isLoading ? (
          <Loading />
        ) : (
          popular.map((item) => (
            <ItemCategory
              key={item._id}
              item={item}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center">
        <button className="btn hover:bg-[#FFA300]">View Full Menu</button>
      </div>
    </div>
  );
};

export default OurMeno;
