import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { useAppSelector } from "../hooks/useRedux";


export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const { unreadCount } = useAppSelector((s) => s.chat);

  const handleLogout = () => {
    logout()
    toast.success("LoggedOut Successfully!")
    navigate("/")
  }

  return (
    <header className="bg-white shadow-sm relative sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <svg className="h-8" viewBox="0 0 28 24" fill="none" onClick={() => navigate("/")}>
                <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41Z" fill="currentColor"/>
              </svg>
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li><Link to="/about" className="hover:text-teal-900 transition duration-200">About</Link></li>
                <li><Link
                        to="/user/products"
                        className="hover:text-teal-900 transition duration-200"
                      >
                        Products
                      </Link></li>
                <li>  <Link
                        to="/user/categories"
                        className="hover:text-teal-900 transition duration-200"
                      >
                        Categories
                      </Link></li>

                <div className="flex items-center gap-4">
                  <Link to="/user/cart">
                    <button className="hover:shadow-md transition duration-200 cursor-pointer">
                      Cart
                      {cart.length > 0 && (
                        <span className="ml-1 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {cart.length}
                        </span>
                      )}
                    </button>
                  </Link>

                  {user ? (
                    <>
                    <div className="flex items-center gap-4">
                      <Link to="/chat">
                      <div className="relative cursor-pointer p-2 hover:bg-teal-100 rounded full">
                        💬
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      </Link>
                      <span className="text-teal-600 font-medium">Hello, {user?.name?.split(" ")[0] || "User"}</span>
                      <button onClick={handleLogout} className="px-4 py-1 border border-red-400 text-red-500 rounded hover:bg-red-600 hover:text-white">
                        Logout
                      </button>
                    </div>
                    </>

                  ) : (
                    <>
                      <Link to="/auth/login">
                        <button className="px-4 py-1 border border-teal-300 text-teal-600 rounded hover:bg-teal-600 hover:text-white">Login</button>
                      </Link>
                      <Link to="/auth/register">
                        <button className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-900">Register</button>
                      </Link>
                    </>
                  )}
                </div>
              </ul>
            </nav>

            {menuOpen && (
              <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md px-4 py-3 space-y-3 z-50">

                <Link to="/about" className="block" onClick={() => setMenuOpen(false)}>About</Link>

                <Link to="user/products" className="block" onClick={() => setMenuOpen(false)}>Products</Link>

                <Link to="user/categories" className="block" onClick={() => setMenuOpen(false)}>Categories</Link>

                <Link to="user/cart" onClick={() => setMenuOpen(false)}>
                  <button className=" hover:shadow-md transition duration-200 cursor-pointer">
                    Cart
                    {cart.length > 0 && (
                      <span className="ml-1 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </Link>

                <div className="flex mt-5 gap-6">

                <Link to="/auth/login">
                  <button className=" px-4 py-1 border border-teal-300 text-teal-600 rounded hover:bg-teal-600 hover:text-white">
                    Login
                  </button>
                </Link>

                <Link to="/auth/register">
                  <button className=" px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-900">
                    Register
                  </button>
                </Link>
                </div>

              </div>
            )}

            <div className="block md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <button className="rounded bg-gray-100 p-2 text-gray-600">{menuOpen ? "✖" : "☰"}</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
