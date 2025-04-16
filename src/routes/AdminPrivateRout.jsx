/** @format */

import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAdmin from "../hook/useAdmin";

const AdminPrivateRout = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  if (isAdminLoading) {
    return <Loading />;
  }
  if (isAdmin) {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminPrivateRout;
