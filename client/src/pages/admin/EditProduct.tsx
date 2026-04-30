import { toast } from "sonner";
import axiosInstance from "../../lib/http/axios.config";
import { useEffect, useState } from "react";
import { ResuableForm } from "../../components/common/ResuableForm";
import { useParams } from "react-router";

export const EditProducts = () => {
    const [categories, setCategories] = useState([])
    const {id} = useParams()
    const handleEditProducts = async(_id: string,  data:any) => {
        try {
        const res = await axiosInstance.put(`products/${id}`, data, {
            withCredentials: true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        toast.success("Product Updated Successfully!")
        
        } catch (error) {
        console.log(error);
        toast.error("Product Update Failed")
        
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
    return(
        <div className="p-5">
            <h1 className="text-2xl font-bold ">Edit Product</h1>
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
                onSubmit={(data) => handleEditProducts(id!, data )}
                buttonText="Edit Products"
                />
            </div>

        </div>

    )   
}