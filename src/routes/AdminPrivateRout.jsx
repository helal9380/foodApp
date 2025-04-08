/** @format */

import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hook/useAdmin";
import useAuth from "../hook/useAuth";

const AdminPrivateRout = (children) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loading />;
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
};

export default AdminPrivateRout;
