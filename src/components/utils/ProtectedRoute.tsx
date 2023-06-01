import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../context/AuthContext";

type ProtectedRouteProps = {
  user: UserType | null;
};
const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
