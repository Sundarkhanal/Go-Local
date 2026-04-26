import { NavLink, Outlet } from "react-router-dom";
import { Sidebar } from "../../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;