/** @format */
import { useContext } from "react";
import { AuthContext } from "../context";
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
