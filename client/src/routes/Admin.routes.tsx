import { Route, Routes } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Product from "../pages/admin/Products";
import { Categories } from "../pages/admin/Categories";
import { AddProducts } from "../pages/admin/AddProducts";
import { EditProducts } from "../pages/admin/EditProduct";


export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute role = "admin"> <AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Product/>} />
        <Route path="categories" element={<Categories/>}/>
        <Route path="add-products" element={<AddProducts />} />
        <Route path="edit-products/:id" element={<EditProducts />} />
      </Route>

    </Routes>
  );
};
