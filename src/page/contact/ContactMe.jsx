/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hook/useAxiosPublic";

const ContactForm = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosPublic.post("/send-email", formData).then((res) => {
      if (res.data.accepted) {
        toast("Message sent successfully");
        navigate("/");
      }
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact Me</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4">
        <input
          className="w-full p-3 border rounded"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border rounded"
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-3 border rounded"
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
