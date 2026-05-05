import { Routes, Route } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import { VerifyEmail } from "../pages/auth/VerifyEmail"
import { ForgetPassword } from "../pages/auth/ForgetPassword"
import { ResetPassword } from "../pages/auth/ResetPassword"

export const AuthRoutes =() => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="activate-user" element={<VerifyEmail />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  )
}
