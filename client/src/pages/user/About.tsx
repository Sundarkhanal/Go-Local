import { FaLeaf, FaTag, FaTruck } from "react-icons/fa"
import { useNavigate } from "react-router"

export const About = () => {
    const navigate = useNavigate()
    return(
        <>
    <div className="bg-teal-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-3 text-lg">
            Delivering fresh and quality productsto your doorstep
        </p>
    </div>
    <div className="max-w-5xl mx-auto px-6 py-12 text-center">
    <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
    <p className="text-gray-600">
        We are a local eCommerce platform focused on providing fresh,
        high-quality products directly from farms and trusted suppliers.
        Our goal is to make shopping easy, fast, and reliable for everyone.
    </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white shadow rounded p-6 text-center transition-all duration-300 hover:shadow-xl">
            <FaLeaf className="text-3xl text-teal-600 mx-auto mb-3 transition-transform duration-300 hover:rotate-12"/>
            <h3 className="font-bold text-lg">Fresh Products</h3>
            <p className="text-gray-500 mt-2">Direct From Local Farms</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center transition-all duration-300 hover:shadow-xl">
            <FaTruck className="text-3xl text-teal-600 mx-auto mb-3 transition-transform duration-300 hover:translate-x-1"/>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-gray-500 mt-2">Quick and reliable service</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center transition-all duration-300 hover:shadow-xl">
            <FaTag className="text-3xl text-teal-600 mx-auto mb-3 transition-transform duration-300 hover:scale-110"/>
            <h3 className="font-bold text-lg">Best Prices</h3>
            <p className="text-gray-500 mt-2">Affordable for everyone</p>
        </div>
    </div>

      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">
          Start Shopping Today
        </h2>

        <button onClick={() => navigate("/user/products")} className="mt-4 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition cursor-pointer">
          Explore Products
        </button>
      </div>

    </>
    

    

    )


}