import { useState } from "react"
import { useNavigate } from "react-router"
import axiosInstance from "../../lib/http/axios.config"
import Cookies from "js-cookie"


const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email:"",
        password:""
    })

    const handleLogin = async() => {
        try {
            const res = await axiosInstance.post("auth/login", form)
            console.log(res.data);
            alert("Logged In Successfully!")
            

            const userProfile = await axiosInstance.get("auth/me", {
                headers:{
                    "Authorization": "Bearer "+res.data.data
                }
                
            });
            Cookies.set("accessToken", res.data.data, {expires: 1, path:"/", secure:true, sameSite:"Strict"})
            console.log(Cookies.get("accessToken"));

            console.log("UserProfile",userProfile);
            
            navigate("/")
            
            
        } catch (error:any) {
            console.log(error.response?.data)
        }
    }
    return(
         <div className="flex items-center justify-center min-h-[90vh] bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
          Login to your account
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <span className="text-sm text-teal-600 cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Login
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );

}

export default Login