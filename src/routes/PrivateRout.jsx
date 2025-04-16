/** @format */

import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hook/useAuth";

const PrivateRout = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading || !user.email) {
    return <Loading />;
  }
  if (user && user.email) {
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

export default PrivateRout;
