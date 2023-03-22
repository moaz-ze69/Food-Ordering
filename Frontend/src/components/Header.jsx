import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import foody from "../../src/assets/images/foody.png";
import cartIcon from "../../src/assets/icons/cart.svg";
import { getUser, setUser, clearUser } from "../../src/stores/auth/authSlice";
import { loadUser } from "../services/authServices";

const Header = ({ cartCount }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
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
  }, []);

  return (
    <nav id="header" className="bg-black text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="logo-wrapper pl-4 flex items-center ">
          <Link
            to="/"
            className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          >
            <img src={foody} alt="logo" className="w-40 h-40 object-cover" />
          </Link>
        </div>
        <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
          <Link to="/" className="text-xl">
            Home
          </Link>
          <Link to="#about" className="text-xl">
            About
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link to="/cart" className="mr-4 relative">
            <img src={cartIcon} alt="cart" />
            {cartCount > 0 ? (
              <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">
                {cartCount}
              </div>
            ) : null}
          </Link>
          {user.isAuthenticated ? (
            <Link
              to="/profile"
              className="text-xl text-white flex justify-center items-center"
            >
              {user.user.user.username}
              <img
                src={user.user.user.avatar.url}
                alt={user.user.user.username}
                className="w-8 h-8 rounded-full m-2"
              />
            </Link>
          ) : (
            <div className="flex items-center justify-center space-x-4">
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
