import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/elements/Button";
import { updateUser, uploadImage, loadUser } from "../../services/authServices";
import { getUser, setUser, clearUser } from "../../stores/auth/authSlice";
import cameraImage from "../../assets/images/camera.png";

const UpdateProfile = () => {
  let navigate = useNavigate();
  const user = useSelector(getUser);
  const [userImageUrl, setUserImageUrl] = useState(
    user.isAuthenticated && user.user.user.avatar.url
  );
  const [userImage, setUserImage] = useState();
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
    dispatch(clearUser());
    loadUser(
      (response) => {
        dispatch(setUser(response.data));
      },
      (err) => {
        if (err.response.status === 400) {
          dispatch(clearUser());
        }
      }
    );
    if (response.status === 200) {
      toast.success("Update Successful🎉", {
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

  const readyUploadImage = () => {
    const data = new FormData();
    data.append("file", userImage);
    data.append("upload_preset", "food-ordering");
    data.append("cloud_name", "dlwq5rgeu");
    return data;
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (userImage) {
      const img = readyUploadImage();
      uploadImage(
        img,
        (userdata) => {
          data.avatar.public_id = userdata.public_id;
          data.avatar.url = userdata.secure_url;
        },
        (err) => {
          data.avatar = user.user.user.avatar;
          console.log("object", err);
          fail();
        }
      );
    } else {
      data.avatar = user.user.user.avatar;
    }
    updateUser(data, success, fail, () => {
      setLoading(false);
    });
  };
  if (!user.isAuthenticated) {
    navigate("/");
  } else {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
          <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
            <h5 className="text-center mb-8 text-3xl text-white">
              Update Profile
            </h5>
            <form
              className="w-full space-y-6 flex justify-center flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex w-20 self-center relative">
                <label htmlFor="avatar" className="block text-lg font-medium ">
                  <div className="flex justify-center relative w-20 h-20">
                    <img
                      src={userImageUrl}
                      alt={user.user.user.username}
                      className="w-20 hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-150 hover:opacity-50 overflow-hidden rounded-full"
                    />
                    <img
                      src={cameraImage}
                      alt="cameraIcon"
                      className="w-20 absolute -z-20 hover:cursor-pointer"
                    />
                  </div>
                </label>
                <input
                  {...register("avatar")}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setUserImageUrl(URL.createObjectURL(e.target.files[0]));
                    setUserImage(e.target.files[0]);
                  }}
                  className="absolute -z-10 w-20 opacity-0"
                />
              </div>
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
                  defaultValue={user.user.user.username}
                  className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-200"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="some@exapmle.com"
                  defaultValue={user.user.user.email}
                  className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                />
              </div>
              <div>
                <div
                  className="flex mb-2 justify-end text-md font-medium text-yellow-500 cursor-pointer"
                  onClick={() => navigate("/password/change")}
                >
                  Change Password
                </div>
                <Button size="large">{loading ? "loading" : "Update"}</Button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateProfile;
