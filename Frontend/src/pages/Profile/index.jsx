import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/elements/Button";
import { getUser, clearUser } from "../../stores/auth/authSlice";
import { logoutUser } from "../../services/authServices";

const Profile = () => {
  let navigate = useNavigate();
  const user = useSelector(getUser);
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, []);

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
    dispatch(clearUser());
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

  const onSubmit = () => {
    setLoading(true);
    logoutUser(success, fail, () => {
      setLoading(false);
    });
  };

  if (!user.isAuthenticated) {
    navigate("/");
  } else {
    return (
      <div className="h-screen bg-black flex  items-center justify-center">
        <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
          <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
            <h5 className="text-center mb-8 text-3xl text-white">
              User Profile
            </h5>
            <div className="w-full space-y-6 relative">
              <div className="grid grid-cols-3">
                <h1 className="block text-lg font-medium text-gray-200">
                  Username:{" "}
                </h1>
                <h1 className="block text-lg font-medium text-gray-200">
                  {user.user.user.username}
                </h1>
              </div>
              <div className="absolute -top-16 right-0">
                <img
                  src={user.user.user.avatar.url}
                  alt={user.user.user.username}
                  className="w-20 overflow-hidden rounded-full h-20 hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-[2.5]"
                />
              </div>
              <div className="grid grid-cols-3">
                <h1 className="block text-lg font-medium text-gray-200">
                  Email:{" "}
                </h1>
                <h1 className="block text-lg font-medium text-gray-200">
                  {user.user.user.email}
                </h1>
              </div>
              <form
                className="w-full space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Button size="large">{loading ? "loading" : "Logout"}</Button>
                  <div
                    className="flex mt-4 justify-end text-md font-medium text-yellow-500 cursor-pointer"
                    onClick={() => navigate("/profile/update")}
                  >
                    Edit Profile
                  </div>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
