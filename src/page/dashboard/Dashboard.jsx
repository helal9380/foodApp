/** @format */

import { FaBook, FaHome, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { MdRateReview } from "react-icons/md";
import { RiHome2Fill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { TbBrandBooking } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";
import useCart from "../../hook/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  const isAdmin = true;
  return (
    <div className="flex">
      <div className="w-3/12 bg-[#bc5800] h-screen text-white p-10">
        <div className="mb-10">
          <h3 className="text-xl font-semibold">BISTRO BOSS</h3>
          <p className="tracking-[6px] text-start uppercase">resturant</p>
        </div>
        <ul className="space-y-4">
          {isAdmin ? (
            <>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <FaHome className="text-xl" />
                  ADMIN HOME
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <FaTableList className="text-xl" />
                  MANAGE ITEMS
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <ImSpoonKnife className="text-xl" />
                  ADD ITEM
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <FaBook className="text-xl" />
                  MANAGE BOOKING
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/users"}>
                  <FaUsers className="text-xl" />
                  ALL USERS
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <RiHome2Fill className="text-xl" />
                  user home
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <SlCalender className="text-xl" />
                  reservation
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <MdRateReview className="text-xl" />
                  ADD REVIW
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <FaShoppingCart className="text-xl" />
                  My Cart({cart.length})
                </Link>
              </li>
              <li>
                <Link
                  className="flex gap-2 uppercase"
                  to={"/dashboard/cart"}>
                  <TbBrandBooking className="text-xl" />
                  My booking
                </Link>
              </li>
            </>
          )}

          <div className="bg-white w-full h-[1px] my-10"></div>

          <li>
            <Link
              className="flex gap-2"
              to={"/"}>
              {" "}
              <RiHome2Fill className="text-xl" /> Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
