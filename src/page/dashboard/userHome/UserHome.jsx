/** @format */
import { motion } from "framer-motion";
import { CalendarDays, DollarSign, Star, Utensils } from "lucide-react";
import useAuth from "../../../hook/useAuth";
import useCart from "../../../hook/useCart";

const mockUser = {
  name: "Asadur",
  createdAt: "2024-06-01",
};

const stats = {
  totalReservations: 4,
  totalSpent: 325.75,
  favoriteDish: "Grilled Chicken",
};

const recentOrders = [
  {
    id: 1,
    dishName: "Beef Burger",
    price: 12.5,
    category: "Burger",
    date: "2025-04-10",
  },
  {
    id: 2,
    dishName: "Cheesy Pizza",
    price: 15.99,
    category: "Pizza",
    date: "2025-04-05",
  },
  {
    id: 3,
    dishName: "Mango Smoothie",
    price: 6.25,
    category: "Beverage",
    date: "2025-04-02",
  },
];

const SummaryCard = ({ icon, title, value }) => (
  <motion.div
    className="bg-white p-4 rounded-2xl shadow-md border border-[#bc5800] text-center space-y-2"
    whileHover={{ scale: 1.05 }}>
    <div className="flex justify-center text-primary text-2xl">{icon}</div>
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-xl font-semibold">{value}</div>
  </motion.div>
);

const UserHome = () => {
  const [cart] = useCart();
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Message */}
      <h2 className="text-2xl font-bold">👋 Welcome, {mockUser.name}!</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<Utensils className="text-[#bc5800]" />}
          title="Total Save to Cart"
          value={cart.length}
        />
        <SummaryCard
          icon={<DollarSign className="text-[#bc5800]" />}
          title="Total Due Cart"
          value={`$${totalAmount}`}
        />
        <SummaryCard
          icon={<Star className="text-[#bc5800]" />}
          title="Favorite Dish"
          value={`No Favourit`}
        />
        <SummaryCard
          icon={<CalendarDays className="text-[#bc5800]" />}
          title={`User Email`}
          value={user?.email}
        />
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-xl font-semibold mb-3">🧾 Recent Orders</h3>
        <div className="space-y-2">
          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            recentOrders.map((order) => (
              <motion.div
                key={order.id}
                className="p-3 bg-white rounded-xl shadow-sm border border-[#bc5800] hover:shadow-md transition"
                whileHover={{ scale: 1.02 }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.dishName}</p>
                    <p className="text-sm text-gray-500">{order.category}</p>
                  </div>
                  <div className="text-sm text-gray-700">
                    ${order.price} • {new Date(order.date).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
