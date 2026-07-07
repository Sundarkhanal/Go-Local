import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RowSkeleton } from "../ui/table/Row";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axiosInstance from "../../lib/http/axios.config";

interface IProductsTableProps{
    products: any[],
    loading: boolean,
    fetchProducts: () => void
}

const ProductsTable = ({products, loading, fetchProducts}:IProductsTableProps) => {
  const navigate = useNavigate()
  const handleDelete = async(id:string) => {
    try {
      await axiosInstance.delete(`products/${id}`, {
        withCredentials: true
      })
      toast.success("Product Deleted successfully!")
      fetchProducts()
      
    } catch (error) {
      console.log(error);
      toast.error("Error deleting in Product")
      
    }
  }


  return (
    <div className="overflow-x-auto bg-white shadow rounded">

      <table className="w-full text-left ">

        {/* HEADER */}
        <thead className="bg-gray-100">
          <tr>
            <th className="border bg-gray-900 text-white  border-gray-400 px-4 py-2">Title</th>
            <th className="border bg-gray-900 text-white border-gray-400 px-4 py-2">Image</th>
            <th className="border bg-gray-900 text-white border-gray-400 px-4 py-2">Status</th>
            <th className="border bg-gray-900 text-white border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {loading ? (<RowSkeleton rows={6} columns={4} />) :
          (products.map((item:any) => (
            <tr key={item._id} className="border-b">
                <td className="p-4">{item.name}</td>
                <td className="p-4">
                    <img src={item.images} className="w-12 h-12 rounded" />
                </td>
                <td className="p-4 ">

                    <span className={`px-2 py-1 text-xs rounded ${
                    item.status
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                {item.status ? "Active" : "Inactive"}
                </span>
                </td>

                <td className="p-4 flex gap-2">
                <button onClick={() => navigate(`/admin/edit-products/${item._id}`)} className="bg-teal-600 text-white px-3 py-1 rounded cursor-pointer">
                    <FaPen />
                </button>

                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer">
                    <MdDelete />
                </button>
                </td>

            </tr>
          )))
          }
          


        </tbody>

      </table>
    </div>
  );
};

export default ProductsTable;