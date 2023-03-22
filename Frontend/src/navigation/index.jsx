import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import Footer from "../components/Footer";
import ForgetPassword from "../pages/ForgetPassword";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import PaymentSuccess from "../pages/PaymentSuccess";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Update from "../pages/UpdateProfile";
import { cartProducts } from "../stores/cart/cartSlice";
import NotFound from "../pages/NotFound";

const Navigation = () => {
  const cartItems = useSelector(cartProducts);

  return (
    <BrowserRouter>
      <Header cartCount={cartItems ? cartItems.length : 0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password/forget" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/update" element={<Update />} />
        <Route path="/password/change" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
