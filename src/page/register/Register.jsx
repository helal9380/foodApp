/** @format */
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import loginImg from "../../assets/login.jpg";
import { AuthContext } from "../../context";
import useAxiosPublic from "../../hook/useAxiosPublic";
const Register = () => {
  const { createUser, logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = e.target.name;
    const photo = e.target.photo;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password).then((result) => {
      console.log(result);
      // create user in the database
      const userInfo = {
        email,
      };
      axiosPublic
        .post("/users", userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            toast(` the ${result.user.email} create successfully`);
            logOut();
            navigate("/login", { state: { from: location } });
          }
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <div
      className="hero  min-h-screen text-white"
      style={{
        backgroundImage: `url(${loginImg})`,
      }}>
      <form
        onSubmit={handleRegister}
        className="card bg-black opacity-70 w-[40%] shadow-2xl">
        <div className="card-body ">
          <h3 className="text-2xl font-semibold text-center uppercase">
            Register Now !
          </h3>
          <fieldset className="fieldset text-white">
            <label className="fieldset-label">Name</label>
            <input
              type="text"
              className="input w-full bg-transparent border-[#e49917]"
              placeholder="Name"
              name="name"
            />
            <label className="fieldset-label">Photo</label>
            <input
              type="text"
              className="input w-full bg-transparent border-[#e49917]"
              placeholder="Photo URL"
              name="photo"
            />
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="input w-full bg-transparent border-[#e49917]"
              placeholder="Email"
              name="email"
            />
            <label className="fieldset-label">Password</label>
            <input
              type="password"
              className="input w-full bg-transparent border-[#e49917]"
              placeholder="Password"
              name="password"
            />
            <div className="flex justify-between my-2">
              <a className="link link-hover">Forgot password?</a>
              <span>
                Have an account? please{" "}
                <Link
                  className="text-[#e49917]"
                  to="/login">
                  Login
                </Link>
              </span>
            </div>
            <button
              type="submit"
              className="btn bg-[#e49917] border-none mt-4">
              REGISTER
            </button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Register;
