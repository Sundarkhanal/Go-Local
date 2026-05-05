import { useEffect, useState } from "react"
import axiosInstance from "../../lib/http/axios.config";
import { useAddToCart } from "../../hooks/useAddToCart";
import { ProductCart } from "../../components/ProductCart";

export const Products = () => {
    const [products, setProducts] = useState<any []>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)
    const {handleAddToCart} = useAddToCart()
    const [selectProduct, setSelectProduct] = useState<any>(null)

    const limit = 8

    const fetchProducts = async(pageNumner: number = 1) => {
        try {
            setLoading(true)
            const res = await axiosInstance.get(`products/all-products?page=${pageNumner}&limit=${limit}`,{
                withCredentials: true
            });
            
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
              onClick={() => setSelectProduct(data)}
              
            />
          ))}
        </div>

        {selectProduct && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-[600px] relative" onClick={(e) => e.stopPropagation() }>
                    <button className="absolute top-2 right-2 text-xl font-bold cursor-pointer"
                    onClick={() => setSelectProduct(null)}
                    >
                        ✖
                    </button>
                    <img

                        src={`http://localhost:9005/assets/${selectProduct.images}`}
                        className="w-full h-40 object-cover rounded"
                        />

                        <h2 className="text-xl font-bold mt-3">
                            {selectProduct.name}
                        </h2>

                        <p className="text-gray-600">
                            {selectProduct.description}
                        </p>

                        <p className="mt-2">
                            Category: {selectProduct.category?.name}
                        </p>

                        <p className="text-green-600 font-bold mt-2">
                            Nrs. {selectProduct.price}
                        </p>

                </div>
            </div>
        )}

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