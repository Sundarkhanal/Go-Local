import { useState } from "react";
import { useNavigate } from "react-router";



const Register = () => {

    const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleRegister = async () => {
  try {
    const res = await fetch("http://localhost:9005/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      alert("User registered successfully");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
          Register
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Button */}
        <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition cursor-pointer"
        onClick={handleRegister}
        >
          Register
        </button>

      </div>

    </div>
  );
};

export default Register;