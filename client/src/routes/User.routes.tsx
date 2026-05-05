import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/landing/Home.Landing"
import Cart from "../pages/cart/Cart"
import Checkout from "../pages/checkout/Checkout"
import UserCategories from "../pages/user/UserCategories"
import { Products } from "../pages/user/UserProducts"
import { About } from "../pages/user/About"
import ProtectedRoute from "./ProtectedRoutes"

export const UserRoutes =() => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoute />}>
          <Route path="user/cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="user/categories" element={<UserCategories />} />
          <Route path="user/products" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  )
}
