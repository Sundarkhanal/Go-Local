
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";
import hero from "../../assets/images/hero.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/http/axios.config";
import { ProductCart } from "../../components/ProductCart";


const Home = () => {
    const { user } = useAuth()
    const { addToCart } = useCart()
    const navigate = useNavigate()
    const [products, setProducts ] = useState<any[]>([])

    const handleAddToCart = (product: any) => {
        console.log("Product", product);
        
        if (!user) {
            const existing = JSON.parse(localStorage.getItem("guest_cart") || "[]")
            const updatedCart = [...existing, { ...product, quantity: 1 }]
            localStorage.setItem("guest_cart", JSON.stringify(updatedCart))
            navigate("/login", { state: { from: window.location.pathname } })
            return
        }
        addToCart(product)
    }

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const res = await axiosInstance.get("/products/all-products") 
                setProducts(res.data.data)
            } catch (error) {
                console.log(error);
            }

        }
        fetchProducts()
    }, [])



    return (
        <div className="bg-[#faf7f2] min-h-screen">

            <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-between">

                {/* LEFT CONTENT */}
                <div className="w-1/2">
                    <div className="inline-flex items-center font-bold px-3 py-3 border border-teal-300 text-black-700 rounded-full text-xs">
                        FROM THE HIGHLANDS TO YOUR HOME
                    </div>
                    <h1 className="text-5xl font-bold mt-10 leading-tight text-black-800">
                        Crafted By{" "}
                        <span className="text-teal-600 italic">Remote Hands,</span>
                        <br />
                        Made for You
                    </h1>
                    <p className="mt-6 text-gray-600 max-w-md leading-relaxed">
                        Discover authentic goods — honey, herbs, handwoven textiles, and more
                        sourced directly from mountain villages and forest communities. Every
                        purchase empowers a family.
                    </p>
                    <div className="flex gap-3 mt-6 flex-wrap">
                        <span className="px-3 py-1 bg-white border rounded-full text-sm">🌿 Organic</span>
                        <span className="px-3 py-1 bg-white border rounded-full text-sm">🏔 Remote Sourced</span>
                        <span className="px-3 py-1 bg-white border rounded-full text-sm">🤝 Fair Trade</span>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button className="px-6 py-3 bg-teal-600 text-white rounded-full hover:shadow-lg transition">
                            Shop the Collection
                        </button>
                        <button className="px-6 py-3 border border-teal-300 text-teal-700 rounded-full hover:bg-orange-50 transition">
                            Our Story →
                        </button>
                    </div>
                    <div className="flex gap-10 mt-10">
                        <div>
                            <h2 className="text-2xl font-bold">120+</h2>
                            <p className="text-sm text-gray-500">Village Artisans</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">40+</h2>
                            <p className="text-sm text-gray-500">Remote Regions</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">15K+</h2>
                            <p className="text-sm text-gray-500">Happy Customers</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT VISUAL */}
                <div className="w-1/2">
                    <div className="relative">
                        <img
                            src={hero}
                            className="w-[420px] rounded-3xl shadow-xl object-cover hover:scale-105 transition duration-300"
                        />
                        <div className="absolute -z-10 top-8 left-8 w-[400px] h-[400px] bg-yellow-100 blur-3xl opacity-30 rounded-full"></div>
                    </div>
                </div>

            </div>

            {/* CATEGORIES */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-black-800 mb-8">Shop by Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl hover:shadow-lg hover:scale-105 transition text-center cursor-pointer">
                        🌾<p className="mt-2 font-medium">Grains</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:shadow-lg transition text-center cursor-pointer">
                        🍎<p className="mt-2 font-medium">Fruits</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:shadow-lg transition text-center cursor-pointer">
                        🥬<p className="mt-2 font-medium">Vegetables</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center cursor-pointer">
                        🍯<p className="mt-2 font-medium">Organic</p>
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="gap-12 py-16 px-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((item) => (
                        <ProductCart
                            key={item._id}
                            name={item.name}
                            price={item.price}
                            image={`http://localhost:9005/assets/${item.images}`}
                            onAdd={() => handleAddToCart(item)}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;