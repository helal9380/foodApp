/** @format */

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Menu from "../page/ourMenu/Menu";
import Register from "../page/register/Register";
import ShopPage from "../page/shop/ShopPage";

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
]);
