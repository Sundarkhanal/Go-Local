import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/landing/Home.Landing";
import ProtectedRoute from "./ProtectedRoutes";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import UserCategories from "../pages/user/UserCategories";
import { Products } from "../pages/user/UserProducts";
import { About } from "../pages/user/About";
import Success from "../pages/payment/Success";
import Failure from "../pages/payment/Failure";
import { VerifyEmail } from "../pages/auth/VerifyEmail";
import { ForgetPassword } from "../pages/auth/ForgetPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";




function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/activate-user" element={<VerifyEmail />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/" element={<MainLayout />}>
      <Route path="/about" element={<About />} />
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="user/cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="user/categories" element={<UserCategories/>} />
          <Route path="user/products" element={<Products />}/>
        </Route>

      </Route>
      <Route path="/payment/success" element={<Success />} />
      <Route path="/payment/failure" element={<Failure />} />

    </Routes>
  );
}

export default UserRoutes;