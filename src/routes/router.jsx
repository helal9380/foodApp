/** @format */

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../page/dashboard/Dashboard";
import Users from "../page/dashboard/Users";
import AddItem from "../page/dashboard/addItem/AddItem";
import Carts from "../page/dashboard/cart/Carts";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Menu from "../page/ourMenu/Menu";
import Register from "../page/register/Register";
import ShopPage from "../page/shop/ShopPage";
import AdminPrivateRout from "../routes/AdminPrivateRout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/shop/:category",
        element: <ShopPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "cart",
        element: <Carts />,
      },

      // admin related routs

      {
        path: "addItem",
        element: (
          <AdminPrivateRout>
            <AddItem />
          </AdminPrivateRout>
        ),
      },
      {
        path: "users",
        element: (
          <AdminPrivateRout>
            <Users />
          </AdminPrivateRout>
        ),
      },
    ],
  },
]);
