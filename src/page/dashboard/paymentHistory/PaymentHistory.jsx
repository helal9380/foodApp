/** @format */

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 py-8">
      <SectionTitle
        title="Payment History"
        subtitle="Track all your transactions"
      />

      <div className="mt-4 mb-6">
        <h2 className="text-xl font-semibold">
          Total Transactions:{" "}
          <span className="text-[#bc5800]">{payments.length}</span>
        </h2>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-[#bc5800] text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <motion.tr
                  key={payment.tranjectionId || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-gray-200">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{payment?.email}</td>
                  <td className="px-4 py-3">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-3 py-1 text-xs font-semibold uppercase bg-[#bc5800] text-white rounded-full">
                      {payment?.status || "Unknown"}
                    </motion.span>
                  </td>
                  <td className="px-4 py-3">${payment?.price?.toFixed(2)}</td>
                  <td className="px-4 py-3 break-all">
                    {payment?.tranjectionId}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PaymentHistory;
