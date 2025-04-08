/** @format */

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access_token");
      config.headers.authrization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // interceptors 401 403 status
  axiosSecure.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error) => {
      const statusCode = error.response.status;
      if (statusCode === 401 || statusCode === 403) {
        await logOut();
        navigate("/login");
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
