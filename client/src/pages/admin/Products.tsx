import { useEffect, useState } from "react"
import ProductsTable from "../../components/common/Table"
import axiosInstance from "../../lib/http/axios.config"

const Product = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModel, setShowModel] = useState(false)
    const fetchProducts = async() => {
        try {
            setLoading(true);
            const res = await axiosInstance.get("products/all-products", {
                withCredentials:true
            })
            setProducts(res.data.data)
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }
        useEffect(() => {
        fetchProducts()  
    }, [])
    return(
        <>
        <div className="flex justify-end mb-3">
            <button
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
             >
            + Add Product
            </button>
        </div>
        <ProductsTable products={products} loading={loading} fetchProducts={fetchProducts} />
        </>
    )

}
export default Product