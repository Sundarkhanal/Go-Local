import { Routes, Route } from "react-router-dom"
import Success from "../pages/payment/Success"
import Failure from "../pages/payment/Failure"

export const PaymentRoutes =()=> {
  return (
    <Routes>
      <Route path="success" element={<Success />} />
      <Route path="failure" element={<Failure />} />
    </Routes>
  )
}

export default PaymentRoutes