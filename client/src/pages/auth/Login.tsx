import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import axiosInstance from "../../lib/http/axios.config"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext" 

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const { login } = useAuth()
  const { fetchCart } = useCart() 
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async () => {
    try {
      await axiosInstance.post("auth/login", form)
      const userProfile = await axiosInstance.get("auth/me")
      login(userProfile.data.data)

      const savedCart = localStorage.getItem("guest_cart")
      if (savedCart) {
        localStorage.removeItem("guest_cart")
      }

      await fetchCart()
      alert("Logged In Successfully!")
      navigate(from, { replace: true })
    } catch (error: any) {
      console.log(error.response?.data)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
          Login to your account
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="text-right mb-4">
          <span className="text-sm text-teal-600 cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login