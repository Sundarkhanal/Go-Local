import { Link } from "react-router-dom";
import { useState } from "react";
interface INavbarProps{
  cart:any[]
}

const Navbar = ({cart}:INavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm relative sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8"
                viewBox="0 0 28 24"
                fill="none"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>


          <div className="md:flex md:items-center md:gap-12">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li><a className="text-black-500 hover:text-gray-700 hover:text-teal-900 hover:shadow-md transition durition-200" href="#">About</a></li>
                <li><a className="text-black-500 hover:text-gray-700 hover:text-teal-900 hover:shadow-md transition durition-200" href="#">Products</a></li>
                <li><a className="text-black-500 hover:text-gray-700 hover:text-teal-900 hover:shadow-md transition durition-200" href="#">Categories</a></li>
                <div className="flex items-center gap-4">
  
                <Link to="/cart">
                <button className="text-black-700 hover:shadow-md transition duration-200 cursor-pointer">
                    Cart
                    {cart.length > 0 &&
                      <span className="ml-1 bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {cart.length}
                      </span>

                    }
                      
                </button>
                </Link>

                <button className="px-4 py-1 border border-teal-300 text-teal-600 rounded hover:bg-gray-100">
                    Login
                </button>

                <button className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-900">
                    Register
                </button>

        </div>
              </ul>
            </nav>
            {menuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md px-4 py-3 space-y-3 z-50">
                <a href="#" className="block">About</a>
                <a href="#" className="block">Products</a>
                <a href="#" className="block">Categories</a>

                <button className="block w-full text-left">Cart</button>
                <button className="block w-full border p-2 rounded">Login</button>
                <button className="block w-full bg-teal-600 text-white p-2 rounded">
                Register
                </button>
            </div>
            )}           

            {/* Profile
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                alt="user"
                className="h-10 w-10 rounded-full object-cover border"
              />
            </div> */}

            {/* Mobile menu button */}
            <div className="block md:hidden" onClick={()=>setMenuOpen(!menuOpen)}>
              <button className="rounded bg-gray-100 p-2 text-gray-600">
                {menuOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;