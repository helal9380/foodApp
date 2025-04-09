/** @format */
import coverImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import CetegorySection from "../../components/CetegorySection";
import Cover from "../../components/Cover";
import Loading from "../../components/Loading";
import useMenu from "../../hook/useMenu";
import Navbar from "../home/Navbar";
import Offered from "./Offered";

const Menu = () => {
  const [menu, isLoading] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar />
      <Cover
        img={coverImg}
        title={"OUR MENU"}
        description={"whoud you like to try a dish"}
      />
      <div className="max-w-[1140px] mx-auto space-y-4">
        <Offered
          menu={offered}
          name={"offered"}
        />
        <Cover
          img={dessertImg}
          title={"DESSERTS"}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        />
        <CetegorySection
          menu={dessert}
          name={"dessert"}
        />
        <Cover
          img={pizzaImg}
          title={"PIZZA"}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer"
          }
        />
        <CetegorySection
          menu={pizza}
          name={"pizza"}
        />
        <Cover
          img={saladImg}
          title={"SALAD"}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer"
          }
        />
        <CetegorySection
          menu={salad}
          name={"salad"}
        />
        <Cover
          img={saladImg}
          title={"SALAD"}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer"
          }
        />
        <CetegorySection
          menu={drinks}
          name={"drinks"}
        />
        <Cover
          img={soupImg}
          title={"SOUP"}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer"
          }
        />
        <CetegorySection
          menu={soup}
          name={"soup"}
        />
      </div>
    </div>
  );
};

export default Menu;
