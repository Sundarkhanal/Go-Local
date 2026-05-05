import { toast } from "sonner"
import axiosInstance from "../../lib/http/axios.config"
import axios from "axios"
import { ResuableForm } from "../../components/common/ResuableForm"

export const ForgetPassword = () => {
    const handleForgetPassword = async(email:string) => {
        try {
            await axiosInstance.post("auth/forget-password", email)
            toast.success("Email Sent!", {
                description:"Forget Password link was sent to your email."
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message
                console.log(message);
                toast.error(message || "Error in Sending Email")
            } else {
                toast.error("Something went wrong!")
            }
            
        }

    }
    return(
        <div className="mt-20 flex items center justify-center ">
            <div className="w-full max-w-md p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold">Forget Password</h1>
                <ResuableForm fields={[
                    {
                        name:"email",
                        label:"Enter Your Email",
                        type:"email"
                    }
                ]} 
                onSubmit={handleForgetPassword}
                buttonText="Forget Password"
                 />
            </div>

        </div>

    )
}