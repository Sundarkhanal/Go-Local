import { toast } from "sonner";
import axiosInstance from "../../lib/http/axios.config";
import { useEffect, useState } from "react";
import { ResuableForm } from "../../components/common/ResuableForm";

export const AddProducts = () => {
    const [categories, setCategories] = useState([])

    const handleAddProducts = async(data: any) => {
        try {
            const res = await axiosInstance.post("products/create-product", data, {
                withCredentials: true,
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            toast.success("Product added successfully!")
            
        } catch (error) {
            console.log(error);
            toast.error("Error in Adding Products.")
            
        }
    }


    const handleFetchCategories = async() => {
        try {
            const res = await axiosInstance.get("category/get-data")
            setCategories(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleFetchCategories()
    }, [])
    console.log(categories);
    

    return(
        <div className="p-5">
            <h1 className="text-2xl font-bold ">Add Product</h1>
            <div className="mb-6 bg-white p-4 rounded shadow">
                <ResuableForm 
                fields={[
                    {
                        name:"name",
                        label:"Product Name",
                        type:"text"
                    }, {
                        name:"description",
                        label:"Product Description",
                        type:"text"

                    },{
                        name:"category",
                        label:"Product Category",
                        type:"select",
                        options:categories
                    },{
                        name:"price",
                        label:"Price",
                        type:"number"
                    },{
                        name:"stockQuantity",
                        label:"Stock Quantity",
                        type:"number"
                    },{
                        name:"images",
                        label:"Product Image",
                        type:"file"
                    }

                ]}
                onSubmit={handleAddProducts}
                buttonText="Add Products"
                />
            </div>

        </div>

    )
}