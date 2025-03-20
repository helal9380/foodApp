/** @format */
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const { initialPath } = useParams();

  const handleLogOut = () => {
    logOut()
      .then(() => toast(` the user logout successfully`))
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
        <div className="indicator">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />{" "}
          </svg>
        </div>
        <button
          onClick={user && handleLogOut}
          className="cursor-pointer">
          {user ? "LOGOUT" : <Link to="/login">LOGIN</Link>}
        </button>
        <FaUserCircle className="text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
