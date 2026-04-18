import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/landing/Home.Landing";
import { useState } from "react";
import Cart from "./pages/cart/Cart";

function App() {
  const [cart, setCart] = useState<any[]>([])
  return (
    <Routes>
      <Route path="/" element={<MainLayout cart = {cart}/>}>
        <Route index element={<Home cart = {cart} setCart = {setCart} />} />
        <Route path="/cart" element={<Cart cart = {cart} setCart = {setCart} />} />
      </Route>
    </Routes>
  );
}

export default App;