import { useEffect, useState } from "react"
import axiosInstance from "../../lib/http/axios.config"
import { ResuableForm } from "../../components/common/ResuableForm"

export const Categories = () => {
    const [Categories, setCategories] = useState([])

    const fetchCategories = async() => {
        const res = await axiosInstance.get("category/get-data")
        setCategories(res.data.data)
    }
    useEffect(() => {
        fetchCategories()
    }, []);

    const handleCreateCategory = async(data:any) => {
        try {
            await axiosInstance.post("category/create-category", data, {
                withCredentials:true
            },
        )
        fetchCategories()
        } catch (error:any) {
            console.log(error.response?.data);
            
        }
    }

    const deleteCategory = async(id: string) => {
        try {
            await axiosInstance.delete(`categories/${id}`, {
                withCredentials: true
            })
            fetchCategories()
        } catch (error:any) {
            console.log(error.response?.data);
            
        }
    }

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Categories</h1>
            <div className="mb-6 bg-white p-4 rounded shadow">
                    <ResuableForm
                    fields={[
                        {
                        name: "name",
                        label: "Category Name",
                        type: "text",
                        },
                        {
                        name: "description",
                        label: "Description",
                        type: "text",
                        },
                    ]}
                    onSubmit={handleCreateCategory}
                    buttonText="Add Category"
                    />
             </div>
            <div className="bg-white rounded shadow">
                <table className="w-full">

                <thead className="bg-gray-800 text-white">
                    <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {Categories.map((cat: any) => (
                    <tr key={cat._id} className="border-b">

                        <td className="p-3">{cat.name}</td>

                        <td className="p-3">
                        <button
                            onClick={() => deleteCategory(cat._id)}
                            className="text-red-500 cursor-pointer"
                        >
                            Delete
                        </button>
                        </td>

                    </tr>
                    ))}
                </tbody>

                </table>
            </div>

            

        </div>
    )
}