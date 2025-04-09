/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [cart, refetch, isLoading];
};

export default useCart;
