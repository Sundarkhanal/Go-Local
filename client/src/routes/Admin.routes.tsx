import { Route, Routes } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Product from "../pages/admin/Products";


const AdminRoutes = () => {
  return (
    <Routes>
      
      {/* ADMIN ROUTES */}
      <Route path="/" element={<ProtectedRoute role = "admin"> <AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="/products" element={<Product/>} />
      </Route>

    </Routes>
  );
};

export default AdminRoutes;