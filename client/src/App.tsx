import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/landing/Home.Landing";
import { useState } from "react";
import Cart from "./pages/cart/Cart";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  const [cart, setCart] = useState<any[]>([]);

  return (
    <Routes>


      <Route path="/" element={<MainLayout cart={cart} />}>
        <Route index element={<Home cart={cart} setCart={setCart} />} />
        <Route path="products" element={<div>Products</div>} />
        <Route path="product/:id" element={<div>Product Details</div>} />
        <Route path="categories" element={<div>Categories</div>} />
      </Route>


      <Route path="/login" element={<Login setCart = {setCart} />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<div>Checkout</div>} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Route>

    </Routes>
  );
}

export default App;