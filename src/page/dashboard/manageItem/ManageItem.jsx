/** @format */

import { TiDelete, TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useMenu from "../../../hook/useMenu";

const ManageItem = () => {
  const [menu, isLoading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (item) => {
    console.log(item._id);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${item._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Yes Delete now!",
              text: `The ${item.name} delete now!`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleEdit = (item) => {
    console.log(item._id);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <SectionTitle
        title="All Menu!"
        subtitle="Manage Menu"
      />

      <div className="md:px-10 px-2">
        <h2 className="text-xl md:text-2xl mb-2">
          All Menu here! ({menu.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#bc5800] text-white rounded-full">
              <tr>
                <th>Photo</th>
                <th>Recipe Name</th>
                <th>Price</th>
                <th>Action</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask rounded h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn bg-red-500 btn-sm">
                      {" "}
                      <TiDelete className="text-2xl text-white" />{" "}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn bg-[#bc5800] btn-sm">
                      {" "}
                      <TiEdit className="text-2xl text-white" />{" "}
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

export default ManageItem;
