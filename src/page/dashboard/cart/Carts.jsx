/** @format */

import { FaMoneyCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useCart from "../../../hook/useCart";

const Carts = () => {
  const [cart, refetch, isLoading] = useCart();
  const axiosPublic = useAxiosPublic();

  const totalPrice = cart.reduce((accumulator, item) => {
    return (accumulator += item.price);
  }, 0);

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/carts/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `Your ${item.name} has been deleted.`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="bg-white p-5">
      <div className="text-center space-y-2 my-5 flex justify-between items-center">
        <h2 className="text-2xl">All Carts Here! ({cart.length})</h2>
        <h2 className="uppercase text-xl">Total price : ${totalPrice}</h2>
        <button
          className="btn bg-[#bc5800] text-white"
          disabled={cart.length === 0}>
          Paid
        </button>
      </div>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Check</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.length === 0 ? (
                <p>No Data Found</p>
              ) : (
                cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.name}
                      <br />
                    </td>
                    <td>${item.price}</td>
                    <th>
                      <button className="btn hover:bg-[#FFA300] btn-xs">
                        <FaMoneyCheck className="text-xl" />
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn hover:bg-[#FFA300] btn-xs">
                        <MdDelete className="text-xl" />
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Carts;
