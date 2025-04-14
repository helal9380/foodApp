/** @format */

import { useQuery } from "@tanstack/react-query";
import { AiFillProduct } from "react-icons/ai";
import { FaDollarSign, FaUserFriends } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ["order-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        title="Admin"
        subtitle="Admin Home"></SectionTitle>

      <div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary text-5xl">
              <FaUserFriends />
            </div>
            <div className="stat-title font-semibold text-lg">Total Users</div>
            <div className="stat-value text-primary">{stats?.users}</div>
            <div className="stat-desc">Only Brand New User</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary text-5xl font-semibold">
              <AiFillProduct />
            </div>
            <div className="stat-title">Total menu-item</div>
            <div className="stat-value text-secondary">{stats?.menuItems}</div>
            <div className="stat-desc">All Menu Item here</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-5xl font-semibold text-secondary">
              <FaDollarSign />
            </div>
            <div className="stat-value">${stats.revenue.toFixed(2)}</div>
            <div className="stat-title">Total Payment: {stats.allOrders}</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
