import { toast } from "sonner";
import { ResuableForm } from "../../components/common/ResuableForm"
import axiosInstance from "../../lib/http/axios.config";
import axios from "axios";
import { useNavigate } from "react-router";

interface IVerifyEmail {
  email:"string",
  otp:"string"
}

export const VerifyEmail = () => {
  const navigate = useNavigate()
  const handleVerifyEmail = async(data : IVerifyEmail) => {
    try {
      await axiosInstance.post("auth/activate-user", data)
      toast.success("Your Account was Activated Successfully!")
      navigate("/login")
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        console.log(message);
        toast.error(message || "Error in Verifying Email")
      } else {
        toast.error("Something went wrong!")
      }
      
    }
  }
  return(
    <>
    <div className="p-6">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <div className="mb-6 bg-white p-4 rounded shadow">
        <ResuableForm fields={[
          {
            name: "email",
            label:"Enter Your Email",
            type:"email"
          },
          {
            name:"otp",
            label:"Enter Your OTP Code",
            type:"text"
          }
        ]}
        onSubmit={handleVerifyEmail}
        buttonText="Verify Email"
         />

      </div>
    </div>
    
    
    </>
  )
}