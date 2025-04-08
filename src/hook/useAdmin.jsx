/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data.admin;
    },
  });
  return [isAdmin];
};

export default useAdmin;
