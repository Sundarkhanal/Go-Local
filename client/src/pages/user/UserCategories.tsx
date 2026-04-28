import { useEffect, useState } from "react"
import axiosInstance from "../../lib/http/axios.config";

const UserCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchCategories = async() => {
        try {
            setLoading(true)
            const res =  await axiosInstance.get("category/get-data", {
                withCredentials: true
            })
            // console.log(res.data);
            
            setCategories(res.data.data)
        } catch (error) {
            console.log("Fetch categories Error", error);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    return(
        <div className="p-6">
            <h1 className="text-2xl font-blod mb-4">All Categories</h1>

            {loading ? (
                <div className="grid grid-clos-2 md: grid-clos-4 gap-6">
                    {Array.from({length: categories.length}).map((_, i) => (
                        <div key={i}
                        className="bg-gray-200 rounded-2xl p-6 text-center animate-pulse"
                        >
                        <div className="h-6 w-6 bg-gray-300 rounded-full max-auto mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded w-20 max-auto"></div>
                        </div>
                    ))}

                </div>
            ): categories.length == 0 ? (
                <p className="text-gray-500">No categories Found</p>
            ): (
                <div className="bg-white shadow rounded p-6 ">
                    <h2 className="text-xl font-semibold mb-6">Categories </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((data:any) => (
                            <div
                            key={data._id}
                            className="bg-gray-100 rounded-2xl p-6 text-center hover:shadow-lg transaction cursor-pointer"
                            >
                                <div className="text-2xl mb-2 ">🌿</div>
                                <h3 className="font-medium">{data.name}</h3>
                            </div>
                        ))}

                    </div>
                </div>
            ) }


        </div>
    )
}

export default UserCategories