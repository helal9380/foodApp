/** @format */
import { useContext } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import loginImg from "../../assets/login.jpg";
import { AuthContext } from "../../context";
import Navbar from "../home/Navbar";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(() => toast(`Login success`))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Navbar />
      <div
        className="hero  min-h-screen text-white"
        style={{
          backgroundImage: `url(${loginImg})`,
        }}>
        <div className="card bg-black opacity-70 w-[40%] shadow-2xl">
          <form
            onSubmit={handleLogin}
            className="card-body ">
            <h3 className="text-2xl font-semibold text-center uppercase">
              Login Now !
            </h3>
            <fieldset className="fieldset">
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
              <div className="flex justify-between">
                <a className="link link-hover">Forgot password?</a>
                <span>
                  Are you new here? please{" "}
                  <Link
                    className="text-[#e49917]"
                    to="/register">
                    Register
                  </Link>
                </span>
              </div>
              <button className="btn bg-[#e49917] border-none mt-4">
                LOGIN
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
