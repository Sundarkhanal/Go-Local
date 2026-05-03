import { FaFacebook, FaInstagram, FaTwitter, FaShoppingBag } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaShoppingBag /> MyShop
          </h2>
          <p className="text-gray-400 mt-3 text-sm text-white">
            Your trusted eCommerce platform for fresh and quality products delivered fast.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer text-white">Home</li>
            <li className="hover:text-white cursor-pointer text-white">Products</li>
            <li className="hover:text-white cursor-pointer text-white">About Us</li>
            <li className="hover:text-white cursor-pointer text-white">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-gray-400 text-sm text-white">
            <li>Electronics</li>
            <li>Fruits</li>
            <li>Vegetables</li>
            <li>Local Foods</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-teal-400 cursor-pointer transition" />
            <FaInstagram className="hover:text-teal-400 cursor-pointer transition" />
            <FaTwitter className="hover:text-teal-400 cursor-pointer transition" />
          </div>

          <p className="text-gray-500 text-sm mt-4 text-white">
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
};