/** @format */

import { useQuery } from "@tanstack/react-query";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hook/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["uaers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authrization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return res.data;
    },
  });

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${user.email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Yes Admin now!",
              text: `The user ${user.email} admin now!`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Admin ${user.email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Admin it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Yes Admin now!",
              text: `The user ${user.email} admin now!`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-100">
      <div className="bg-white md:p-4 rounded-lg md:mx-4">
        <h3 className="md:text-2xl text-center md:text-start text-xl mt-2 font-semibold uppercase">
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
                  <td className="text-md md:text-lg">
                    {user.email} ({user.role || "User"})
                  </td>
                  <td onClick={() => handleMakeAdmin(user)}>
                    {user.role === "admin" ? (
                      <button className="p-2 border w-full md:p-none rounded text-[8px] md:btn md:btn-sm bg-[#bc5800] text-white">
                        Make an User
                      </button>
                    ) : (
                      <button className="p-2 border w-full md:p-none rounded text-[8px] md:btn md:btn-sm bg-[#bc5800] text-white">
                        Make an Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn bg-red-500 btn-sm">
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
