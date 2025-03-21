/** @format */

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";

const ChefRecommendCard = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleAddToCart = async () => {
    if (user && user.email) {
      const userSelectItem = {
        email: user.email,
        menuId: item._id,
        name: item.name,
        image: item.image,
        category: item.category,
        price: item.price,
      };
      const res = await axiosSecure.post("/carts", userSelectItem);
      if (res.data.insertedId) {
        toast("successfully added to the cart");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className=" bg-[#F3F3F3] shadow-sm">
      <figure className="p-2">
        <img
          src={item.image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.name}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn bg-[#FFA300] uppercase">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChefRecommendCard;
