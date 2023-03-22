import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/elements/Button";
import { getUser, setUser } from "../../stores/auth/authSlice";
import { changePassword } from "../../services/authServices";

const ChangePassword = () => {
  let navigate = useNavigate();
  const user = useSelector(getUser);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user, navigate]);

  const fail = () => {
    toast.error("Some Error Occured⚠️", {
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
    if (response.status === 200) {
      toast.success("Successful Password Change!🎉", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } else {
      fail();
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    changePassword(data, success, fail, () => {
      setLoading(false);
    });
  };

  return (
    <div className="h-screen bg-black flex  items-center justify-center">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
          <h5 className="text-center mb-8 text-3xl text-white">
            Change Password
          </h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-lg font-medium text-gray-200"
              >
                Old Password
              </label>
              <input
                {...register("oldPassword")}
                id="oldPassword"
                type="password"
                placeholder="********"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-lg font-medium text-gray-200"
              >
                New Password
              </label>
              <input
                {...register("newPassword")}
                id="newPassword"
                type="password"
                placeholder="********"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium text-gray-200"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="********"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <Button size="large">
              {loading ? "loading" : "Change Password"}
            </Button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
