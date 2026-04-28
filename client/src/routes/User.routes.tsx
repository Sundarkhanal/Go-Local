import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/landing/Home.Landing";
import ProtectedRoute from "./ProtectedRoutes";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import UserCategories from "../pages/user/UserCategories";



function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        {/*Protected routes inside MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="user/cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="user/categories" element={<UserCategories/>} />
          <Route path="profile" element={<div>Profile</div>} />
        </Route>

      </Route>

    </Routes>
  );
}

export default UserRoutes;