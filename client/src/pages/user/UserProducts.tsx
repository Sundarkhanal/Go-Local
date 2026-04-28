import { useEffect, useState } from "react"
import axiosInstance from "../../lib/http/axios.config";
import { ProductCart } from "../../components/ProductCart";

export const Products = () => {
    const [products, setProducts] = useState<any []>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 12

    const fetchProducts = async(pageNumner: number = 1) => {
        try {
            const res = await axiosInstance.get(`products/all-products?page=${pageNumner}&limit=${limit}`,{
                withCredentials: true
            });
            setProducts(res.data.data)
            setTotalPages(res.data.totalPages)
            setPage(pageNumner)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])



    return(
        <div className="p-6">
            <h2 className="text-2xl font-bold bm-6">Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((data: any) => (
                <ProductCart
                key={data._id}
                name={data.name}
                price={data.price}
                image={data.image}
                description={data.description}
                category={data.category}
                onAdd={() => {
                    console.log("Add to cart:", data._id);
                }}
                />
            ))}
            </div>

            <div className="flex gap-2 mt-8 justify-center">
                {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => fetchProducts(i + 1)}
                    className={`px-3 py-1 border rounded ${
                    page === i + 1
                        ? "bg-teal-600 text-white"
                        : "bg-white"
                    }`}
                >
                    {i + 1}
                </button>
                ))}
            </div>
        </div>
    )

}