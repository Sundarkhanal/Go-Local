import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import axios from "axios"
import axiosInstance from "../../lib/http/axios.config"
import { ResuableForm } from "../../components/common/ResuableForm"

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const urlToken = searchParams.get("token")
    if (urlToken) {
      setToken(urlToken)
    }
  }, [searchParams])

  const handleResetPassword = async (data: { newpassword: string }) => {
    try {
      await axiosInstance.post("auth/reset-password", {
        token,
        newpassword: data.newpassword,
      })

      toast.success("Password Reset Successfully!")
      navigate("/login")
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        toast.error(message || "Error resetting password")
      } else {
        toast.error("Something went wrong!")
      }
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h1>

        <ResuableForm
          fields={[
            {
              name: "newpassword",
              label: "Enter New Password",
              type: "password",
            },
          ]}
          onSubmit={handleResetPassword}
          buttonText="Reset Password"
        />
      </div>
    </div>
  )
}