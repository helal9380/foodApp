/** @format */

import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
const UpdatedItem = () => {
  const { name, recipe, price, image, _id, category } = useLoaderData();
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
        price: Math.floor(parseFloat(data.price)),
        image: res.data?.data?.display_url,
      };
      const menuRes = await axiosSecure.patch(`/updateItem/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        console.log(menuRes.data);
        // show  the modal massege and reset form
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `The ${data.recipe} updated to the database`,
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
        subtitle="UPDATE AN ITEM"></SectionTitle>

      <div className="w-full md:w-2xl mx-auto px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px]">Recipe Name</legend>
            <input
              defaultValue={name}
              {...register("recipe")}
              type="text"
              className="input w-full"
              placeholder="Type Recipe Name..."
            />
          </fieldset>

          <div className="md:flex gap-6 w-full">
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-[16px]">Category</legend>
              <select
                defaultValue={category}
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
              <legend className="fieldset-legend text-[16px]">Price</legend>
              <input
                defaultValue={price}
                {...register("price")}
                type="number"
                step="0.01"
                className="input w-full"
                placeholder="price"
              />
            </fieldset>
          </div>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend text-[16px]">
              Recipe Details
            </legend>
            <textarea
              defaultValue={recipe}
              {...register("details")}
              className="textarea h-24 w-full"
              placeholder="Recipe Details"></textarea>
          </fieldset>
          <div className="my-2 w-full">
            <input
              {...register("image")}
              required
              type="file"
              className="file-input w-full"
            />
          </div>

          <button
            type="submit"
            className="btn hover:bg-[#bc5800] w-full hover:text-white">
            Update Item <ImSpoonKnife />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatedItem;
