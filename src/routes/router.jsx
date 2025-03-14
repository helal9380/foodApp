/** @format */

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/home/Home";
import Menu from "../page/ourMenu/Menu";
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
    ],
  },
]);
