import { Navigate, Outlet } from "react-router-dom";
import { UserType } from "../context/AuthContext";

type PublicRouteProps = {
  user?: UserType;
};
const PublicRoute = ({ user }: PublicRouteProps) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;
