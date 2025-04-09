/** @format */

import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    const image = { image: data.image[0] };

    const res = await axiosPublic.post(img_hosting_api, image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      // creat menu item and save to the database with the image url
      const menuItem = {
        name: data.recipe,
        recipe: data.details,
        category: data.category.toLowerCase(),
        price: parseFloat(data.price),
        image: res.data?.data?.display_url,
      };
      const menuRes = await axiosSecure.post("/menu", menuItem);
      if (menuRes.data.insertedId) {
        // show  the modal massege and reset form
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `The ${data.recipe} added to the database`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle
        title="What is new!"
        subtitle="ADD AN ITEM"></SectionTitle>

      <div className="md:w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Recipe Name</legend>
            <input
              {...register("recipe")}
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>

          <div className="md:flex gap-6 w-full">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Category</legend>
              <select
                {...register("category")}
                defaultValue="Pick a Category"
                className="select w-full">
                <option disabled={true}>Select Category</option>
                <option>Salad</option>
                <option>Pizza</option>
                <option>Desserts</option>
                <option>Shop</option>
                <option>Drinks</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price</legend>
              <input
                {...register("price")}
                type="number"
                className="input w-full"
                placeholder="price"
              />
            </fieldset>
          </div>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Recipe Details</legend>
            <textarea
              {...register("details")}
              className="textarea h-24 w-full"
              placeholder="Recipe Details"></textarea>
          </fieldset>
          <div className="my-2">
            <input
              {...register("image")}
              type="file"
              className="file-input"
            />
          </div>

          <button
            type="submit"
            className="btn hover:bg-[#bc5800] hover:text-white">
            Add Item <ImSpoonKnife />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
