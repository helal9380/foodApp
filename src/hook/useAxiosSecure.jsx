/** @format */

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

// Create a single axios instance
const axiosSecure = axios.create({
  baseURL: "https://food-app-server-ochre.vercel.app", // change to your live URL for production
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 401) {
          await logOut();
          navigate("/login");
        } else {
          return;
        }
        return Promise.reject(error);
      }
    );

    // Eject interceptors on cleanup to prevent duplicates
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
