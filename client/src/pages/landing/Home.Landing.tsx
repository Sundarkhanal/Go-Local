import ProducCart from "../../components/ProductCart";
import product1 from "../../assets/images/products/product1.jpeg"
import product2 from "../../assets/images/products/product2.jpeg"
import product3 from "../../assets/images/products/product3.jpeg"
import product4 from "../../assets/images/products/product4.jpeg"

interface IHomeProps {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

const Home = ({cart, setCart}: IHomeProps) => {
    const addToCart = (product:any) => {
        setCart([...cart, product])
    }

    const products = [
        {
            id: 1,
            name: "Rice",
            price: 400,
            image:product1
        },
        {
            id: 2,
            name: "Apple",
            price: 500,
            image:product2
        },
        {
            id: 3,
            name: "Millet",
            price: 600,
            image:product3
        },
        {
            id: 4,
            name: "Millet1",
            price: 600,
            image:product4
        }
    ];

  return (


    <div className="bg-[#faf7f2] min-h-screen">
      
      <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-between">
        
        {/* LEFT CONTENT */}
        <div className="w-1/2">
          <div className="inline-flex items-center font-bold px-3 py-3 border border-teal-300 text-black-700 rounded-full text-xs">
            FROM THE HIGHLANDS TO YOUR HOME
          </div>
          <h1 className="text-5xl font-bold mt-10 leading-tight text-black-800">
            Crafted By {" "}
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
            <span className="px-3 py-1 bg-white border rounded-full text-sm">
                🌿 Organic
            </span>
            <span className="px-3 py-1 bg-white border rounded-full text-sm">
                🏔 Remote Sourced
            </span>
            <span className="px-3 py-1 bg-white border rounded-full text-sm">
                🤝 Fair Trade
            </span>
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
            src="../src/assets/images/hero.png"
            className="w-[420px] rounded-3xl shadow-xl object-cover hover:scale-105 transition duration-300"
        />

        <div className="absolute -z-10 top-8 left-8 w-[400px] h-[400px] bg-yellow-100 blur-3xl opacity-30 rounded-full"></div>
        </div>
        </div>

      </div>
      <section className="py-16 px-6 max-w-7xl mx-auto">
  
        <h2 className="text-2xl font-bold text-black-800 mb-8">
            Shop by Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl hover:shadow-lg hover:scale-105 transition text-center cursor-pointer">
            🌾
            <p className="mt-2 font-medium">Grains</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:shadow-lg transition text-center cursor-pointer">
            🍎
            <p className="mt-2 font-medium">Fruits</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:scale-105 hover:shadow-lg transition text-center cursor-pointer">
            🥬
            <p className="mt-2 font-medium">Vegetables</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center cursor-pointer">
            🍯
            <p className="mt-2 font-medium">Organic</p>
            </div>

        </div>

        </section>


        <section className="gap-12 py-16 px-6 max-w-7xl mx-auto">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {products.map((item) => (
                <ProducCart 
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                onAdd={() => addToCart(item)}
                />
               ))} 
                



            </div>
            
            

        </section>

        

    </div>

  );
};

export default Home;