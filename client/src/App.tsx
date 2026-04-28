import { Routes, Route } from "react-router-dom";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserRoutes from "./routes/User.routes";
import AdminRoutes from "./routes/Admin.routes";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* admin routes */}
      <Route path="/admin/*" element={<AdminRoutes/>} />

      {/* user routes */}
      <Route path="/*" element={<UserRoutes />} />

    </Routes>
  );
}

export default App;