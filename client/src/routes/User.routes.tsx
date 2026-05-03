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



function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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

    </Routes>
  );
}

export default UserRoutes;