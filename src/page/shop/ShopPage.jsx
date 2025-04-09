/** @format */
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./tab.css";

import { useState } from "react";
import { useParams } from "react-router";
import shopImg from "../../assets/menu/soup-bg.jpg";
import ChefRecommendCard from "../../components/ChefRecommendCard";
import Cover from "../../components/Cover";
import Loading from "../../components/Loading";
import useMenu from "../../hook/useMenu";
import Navbar from "../home/Navbar";

const ShopPage = () => {
  // const { menu } = useMenu();
  const [menu, isLoading] = useMenu();

  const categories = ["salad", "pizza", "dessert", "soup", "drinks"];
  const { category } = useParams();

  const index = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(index !== -1 ? index : 0);

  const salad = menu.filter((item) => item.category === "salad");
  const dessert = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <Cover
        img={shopImg}
        title={"OUR SHOP"}
      />
      <div className={"my-10 max-w-[1040px] mx-auto"}>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>SALAD</Tab>
            <Tab>PIZZA</Tab>
            <Tab>DESSERTS</Tab>
            <Tab>SOUP</Tab>
            <Tab>DRINKS</Tab>
          </TabList>
          {isLoading ? (
            <div className=" text-xl flex justify-center my-10">
              <Loading category={category} />
            </div>
          ) : (
            <>
              <TabPanel>
                <div className="grid grid-cols-3 gap-4">
                  {salad.map((item) => (
                    <ChefRecommendCard
                      key={item._id}
                      item={item}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-3 gap-4">
                  {pizza.map((item) => (
                    <ChefRecommendCard
                      key={item._id}
                      item={item}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-3 gap-4">
                  {dessert.map((item) => (
                    <ChefRecommendCard
                      key={item._id}
                      item={item}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-3 gap-4">
                  {soup.map((item) => (
                    <ChefRecommendCard
                      key={item._id}
                      item={item}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="grid grid-cols-3 gap-4">
                  {drinks.map((item) => (
                    <ChefRecommendCard
                      key={item._id}
                      item={item}
                    />
                  ))}
                </div>
              </TabPanel>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ShopPage;
