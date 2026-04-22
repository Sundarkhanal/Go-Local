import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // wait until /me finishes
  if (loading) {
    return <div>Loading...</div>;
  }

  // if not logged in → redirect
  if (!user) {
    return <Navigate to="/login"
    state={{from:location.pathname}}
    replace />;
  }

  // if logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;