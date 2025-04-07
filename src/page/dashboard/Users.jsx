/** @format */

import { useQuery } from "@tanstack/react-query";
import { TiDelete } from "react-icons/ti";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Users = () => {
  // TODO:
  const isAdmin = true;
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["uaers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  return (
    <div className="bg-gray-100">
      <SectionTitle
        title={"Users"}
        subtitle={"Manage Users"}
      />

      <div className="bg-white p-4 rounded-lg mx-4">
        <h3 className="text-2xl font-semibold uppercase">
          Total Users ({users.length})
        </h3>

        {/* all user here */}

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#bc5800] text-white rounded-full">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="text-lg">{user.email}</td>
                  <td>
                    {isAdmin ? (
                      <button className="btn btn-sm bg-[#bc5800] text-white">
                        Make an User
                      </button>
                    ) : (
                      <button className="btn btn-sm bg-[#bc5800] text-white">
                        Make an Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn bg-red-500 btn-sm">
                      {" "}
                      <TiDelete className="text-2xl text-white" />{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
