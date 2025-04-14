/** @format */

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../page/dashboard/Dashboard";
import Users from "../page/dashboard/Users";
import AddItem from "../page/dashboard/addItem/AddItem";
import AdminHome from "../page/dashboard/adminHome/AdminHome";
import Carts from "../page/dashboard/cart/Carts";
import ManageItem from "../page/dashboard/manageItem/ManageItem";
import Payment from "../page/dashboard/payment/Payment";
import PaymentHistory from "../page/dashboard/paymentHistory/PaymentHistory";
import UpdatedItem from "../page/dashboard/updateItem/UpdatedItem";
import UserHome from "../page/dashboard/userHome/UserHome";
import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Menu from "../page/ourMenu/Menu";
import Register from "../page/register/Register";
import ShopPage from "../page/shop/ShopPage";
import AdminPrivateRout from "../routes/AdminPrivateRout";
import PrivateRout from "../routes/PrivateRout";

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
    element: (
      <PrivateRout>
        <Dashboard />
      </PrivateRout>
    ),
    children: [
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "cart",
        element: <Carts />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "payment",
        element: <Payment />,
      },

      // admin related routs

      {
        path: "adminHome",
        element: (
          <AdminPrivateRout>
            <AdminHome />
          </AdminPrivateRout>
        ),
      },
      {
        path: "addItem",
        element: (
          <AdminPrivateRout>
            <AddItem />
          </AdminPrivateRout>
        ),
      },
      {
        path: "manageItem",
        element: (
          <AdminPrivateRout>
            <ManageItem />
          </AdminPrivateRout>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminPrivateRout>
            <UpdatedItem />
          </AdminPrivateRout>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/updateItem/${params.id}`),
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
