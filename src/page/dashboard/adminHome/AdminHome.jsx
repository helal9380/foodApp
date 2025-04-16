/** @format */

import { useQuery } from "@tanstack/react-query";
import { AiFillProduct } from "react-icons/ai";
import { FaDollarSign, FaPaypal, FaUserFriends } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["order-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const { data: reCharts = [] } = useQuery({
    queryKey: ["recharts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order");
      return res.data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <path
        d={getPath(x, y, width, height)}
        stroke="none"
        fill={fill}
      />
    );
  };

  // pie charts
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChartData = reCharts.map((item) => {
    return { name: item.category, value: item.quantity };
  });
  return (
    <div>
      <SectionTitle
        title="You are an Admin"
        subtitle="Admin Dashboard"
      />
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
          <div className="stat-value">${stats?.revenue?.toFixed(2)}</div>
          <div className="stat-title text-xl">
            Total Payment: {stats.allOrders}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-5xl font-semibold text-secondary">
            <FaPaypal />
          </div>
          <div className="stat-value">Payment:{stats?.allOrders}</div>
        </div>
      </div>

      {/* pie chart */}
      <div className="flex">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={reCharts}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}>
              {reCharts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % 6]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
          <PieChart
            width={400}
            height={300}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value">
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
