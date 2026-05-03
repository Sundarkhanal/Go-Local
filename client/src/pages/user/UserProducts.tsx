import { useEffect, useState } from "react"
import axiosInstance from "../../lib/http/axios.config";
import { ProductCart } from "../../components/ProductCart";
import { useAddToCart } from "../../hooks/useAddToCart";

export const Products = () => {
    const [products, setProducts] = useState<any []>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)
    const {handleAddToCart} = useAddToCart()

    const limit = 8

    const fetchProducts = async(pageNumner: number = 1) => {
        try {
            setLoading(true)
            const res = await axiosInstance.get(`products/all-products?page=${pageNumner}&limit=${limit}`,{
                withCredentials: true
            });
            console.log(res.data);
            
            setProducts(res.data.data)
            setTotalPages(res.data.meta.totalPages)
            setPage(pageNumner)
        } catch (error) {
            console.log(error); 
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Products</h2>

    {loading ? (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: products.length }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-2xl p-6 text-center animate-pulse"
          >
            <div className="h-6 w-6 bg-gray-300 rounded-full mx-auto mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
          </div>
        ))}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((data: any) => (
            <ProductCart
              key={data._id}
              name={data.name}
              price={data.price}
              image={`http://localhost:9005/assets/${data.images}`}
              description={data.description}
              category={data.category}
              onAdd={() => handleAddToCart(data)}
            />
          ))}
        </div>

        <div className="flex space-x-1 mt-8 justify-center">
        <button
            onClick={() => fetchProducts(page - 1)}
            disabled={page === 1}
            className="rounded-full border border-slate-300 py-2 px-3 text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:opacity-50"
        >
            Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
            
            <button
            key={i}
            onClick={() => fetchProducts(i + 1)}
            className={`min-w-9 rounded-full py-2 px-3.5 text-sm transition-all shadow-sm hover:shadow-lg ${
                page === i + 1
                ? "bg-slate-800 text-white"
                : "border border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
            }`}
            >
            {i + 1}
            </button>
        ))}
        

        <button
            onClick={() => fetchProducts(page + 1)}
            disabled={page === totalPages}
            className="rounded-full border border-slate-300 py-2 px-3 text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:opacity-50"
        >
            Next
        </button>

        </div>
      </>
    )}
  </div>
);
}