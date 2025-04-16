/** @format */

import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
// import useAxiosSecure from "../../../hook/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hook/useAxiosPublic";

const ReviwForm = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const review = {
      name: user?.displayName || "anonymous",
      details: data.comment,
      rating: parseInt(data.rating),
      createdAt: new Date(),
    };
    console.log(review);
    axiosSecure.post("/reviews", review).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        reset();
      } else {
        Swal.fire("Oops!", "Something went wrong.", "error");
      }
    });
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">📝 Leave a Review</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rating (1 to 5)</label>
          <input
            type="number"
            {...register("rating", { required: true, min: 1, max: 5 })}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Enter your rating"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">
              Rating must be between 1 and 5
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block font-medium mb-1">Your Review</label>
          <textarea
            {...register("comment", { required: true })}
            rows="4"
            className="w-full border rounded-md px-3 py-2"
            placeholder="Write your experience..."
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">Comment is required</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#bc5800] cursor-pointer hover:bg-[#bc5800bc] text-white px-4 py-2 rounded-md transition">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviwForm;
