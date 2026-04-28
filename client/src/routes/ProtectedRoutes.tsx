import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";


const ProtectedRoute = ({ children, role }: any) => {
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser && role && role !== loggedInUser.role) {
      toast.warning("You do not have permission to access this panel!");
      navigate("/");
    }
  }, [loggedInUser]);
  if (children) {
    return children
  }

  return <Outlet />;
};

export default ProtectedRoute;