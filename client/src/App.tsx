import { Routes, Route } from "react-router-dom"
import { AdminRoutes } from "./routes/Admin.routes"
import { UserRoutes } from "./routes/User.routes"
import { AuthRoutes } from "./routes/AuthRoutes"
import PaymentRoutes from "./routes/PaymentRoutes"
import { ChatRoutes } from "./routes/chat.routes"


function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/payment/*" element={<PaymentRoutes />} />
      <Route path="/chat/*" element={<ChatRoutes/>} />
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  )
}

export default AppRoutes