import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiGrid,
  FiShoppingCart,
  FiMenu
} from "react-icons/fi";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FiHome />, end: true },
    { name: "Products", path: "/admin/products", icon: <FiBox /> },
    { name: "Categories", path: "/admin/categories", icon: <FiGrid /> },
    { name: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white p-5 min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && <h1 className="text-xl font-bold">Admin</h1>}

        <button className="cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
          <FiMenu size={25} />
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded transition ${
                isActive ? "bg-teal-600" : "hover:bg-gray-800"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            {/* Text (hide when collapsed) */}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};