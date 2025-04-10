/** @format */
import { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../context";
import useCart from "../../hook/useCart";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const navigate = useNavigate();

  const { initialPath } = useParams();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast(` the user logout successfully`);
        navigate("/");
      })
      .then((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#FFA300] transform scale-105 transition-all duration-300 ease-in-out"
              : "font-bold hover:text-[#FFA300] hover:scale-103 transition-all duration-300 ease-in-out"
          }>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#FFA300] transform scale-105 transition-all duration-300 ease-in-out"
              : "font-bold hover:text-[#FFA300] hover:scale-103 transition-all duration-300 ease-in-out"
          }>
          CONTACT US
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#FFA300] transform scale-105 transition-all duration-300 ease-in-out"
              : "font-bold hover:text-[#FFA300] hover:scale-103 transition-all duration-300 ease-in-out"
          }>
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/menu`}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#FFA300] transform scale-105 transition-all duration-300 ease-in-out"
              : "font-bold hover:text-[#FFA300] hover:scale-103 transition-all duration-300 ease-in-out"
          }>
          OUR MENO
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/shop/${initialPath || "salad"}`}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active text-[#FFA300] transform scale-105 transition-all duration-300 ease-in-out"
              : "font-bold hover:text-[#FFA300] hover:scale-103 transition-all duration-300 ease-in-out"
          }>
          OUR SHOP
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar text-white bg-black opacity-80 shadow-sm fixed z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 p-2 shadow">
            {links}
          </ul>
        </div>
        <h2 className="text-2xl font-bold">
          <span className="text-[#FFA300]">FOODY</span>.COM
        </h2>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-4">
        <Link to={"/dashboard/cart"}>
          <button className=" relative flex items-center  gap-2 px-4 py-2 shadow-md">
            <FaCartShopping className="text-xl" />
            <div className="absolute -top-2 -right-2 bg-[#e49917] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
              +{cart.length}
            </div>
          </button>
        </Link>
        <button
          onClick={user && handleLogOut}
          className="cursor-pointer">
          {user ? "LOGOUT" : <Link to="/login">LOGIN</Link>}
        </button>

        {/* dawer */}
      </div>
    </div>
  );
};

export default Navbar;
