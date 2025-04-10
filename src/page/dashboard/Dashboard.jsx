/** @format */

import { FaBook, FaHome, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { MdRateReview } from "react-icons/md";
import { RiHome2Fill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { TbBrandBooking } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../hook/useAdmin";
import useCart from "../../hook/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  return (
    <div className="md:flex">
      <div className="w-full md:w-3/12 bg-[#bc5800] md:h-screen text-white p-10">
        <div className="mb-4 text-center md:mb-10">
          <h3 className="text-4xl md:text-2xl font-semibold">BISTRO BOSS</h3>
          <p className="tracking-[6px] text-center uppercase">resturant</p>
        </div>
        <ul className="space-y-4">
          {isAdmin ? (
            <>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <FaHome className="text-xl" />
                  ADMIN HOME
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/manageItem"}>
                  <FaTableList className="text-xl" />
                  MANAGE ITEMS
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/addItem"}>
                  <ImSpoonKnife className="text-xl" />
                  ADD ITEM
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <FaBook className="text-xl" />
                  MANAGE BOOKING
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
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
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <RiHome2Fill className="text-xl" />
                  user home
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <SlCalender className="text-xl" />
                  reservation
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <MdRateReview className="text-xl" />
                  ADD REVIW
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <FaShoppingCart className="text-xl" />
                  My Cart({cart.length})
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
                  to={"/dashboard/cart"}>
                  <TbBrandBooking className="text-xl" />
                  My booking
                </Link>
              </li>
            </>
          )}

          <div className=" w-full h-[1px] md:my-10 bg-amber-100 my-4"></div>

          <li>
            <Link
              className="flex justify-start item-center gap-2 uppercase hover:bg-gray-300 hover:text-black btn btn-sm bg-[#bc5800] text-white border-none text-start"
              to={"/"}>
              <FaHome className="text-xl" />
              HOME
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
