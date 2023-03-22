import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/elements/Button";
import { loginUser } from "../../services/authServices";
import { getUser, setUser } from "../../stores/auth/authSlice";

const Login = () => {
  let navigate = useNavigate();
  const user = useSelector(getUser);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/");
    }
  }, [user, navigate]);

  const fail = () => {
    toast.error("Invalid Username or Password⚠️", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const success = (response) => {
    dispatch(setUser(response.data));
    if (response.status === 200) {
      toast.success("Successful Login!🎉", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      fail();
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    loginUser(data, success, fail, () => {
      setLoading(false);
    });
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
          <h5 className="text-center mb-8 text-3xl text-white">Login</h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-200"
              >
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                type="username"
                placeholder="JohnDoe"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-200"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="********"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <div
                className="flex mb-2 justify-end text-md font-medium text-yellow-500 cursor-pointer"
                onClick={() => navigate("/password/forget")}
              >
                Forget Password ?
              </div>
              <Button size="large">{loading ? "loading" : "Login"}</Button>
            </div>
          </form>
          <div className="mt-6 flex justify-center">
            <p className="block text-lg font-medium text-gray-200">
              Don't have an account?{" "}
              <span
                className="text-lg font-medium text-yellow-500 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
