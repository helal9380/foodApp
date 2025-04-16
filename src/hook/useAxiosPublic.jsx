/** @format */

import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://food-app-server-ochre.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
