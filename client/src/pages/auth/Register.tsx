import { useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../../lib/http/axios.config";



const Register = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    address: "",
    gender: "",
    image: "",
    });
  const handleRegister = async () => {
  try {
    console.log("FORM SENT:", form);
    const payload = {
        ...form,
        image: form.image || null
    }
    const response = await axiosInstance.post("auth/register", payload)
    console.log(response.data);
    alert("User Registered Successfully")

  } catch (error:any) {
    console.error(error.response?.data);
    alert(error.response?.data?.message);
  }
};

  return (
   <div className="flex items-center justify-center min-h-[90vh] bg-gray-50">
  <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

    <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
      Create Account
    </h2>

    {/* Name */}
    <input
      type="text"
      placeholder="Full Name"
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />

    {/* Phone */}
    <input
      type="text"
      placeholder="Phone (optional)"
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, password: e.target.value })}
    />

    {/* Confirm Password */}
    <input
      type="password"
      placeholder="Confirm Password"
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
    />

    {/* Gender */}
    <select
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, gender: e.target.value })}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="others">Others</option>
    </select>

    {/* Address */}
    <textarea
      placeholder="Address"
      className="w-full mb-3 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, address: e.target.value })}
    />

    {/* Image URL */}
    <input
      type="text"
      placeholder="Image (optional)"
      className="w-full mb-4 px-4 py-2 border rounded"
      onChange={(e) => setForm({ ...form, image: e.target.value })}
    />

    {/* Button */}
    <button
      onClick={handleRegister}
      className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
    >
      Register
    </button>

  </div>
</div>

  );
};

export default Register;