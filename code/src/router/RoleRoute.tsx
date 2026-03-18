import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth";
import type { UserRole } from "../modules/auth/hook/useAuth";

interface IRoleRouteProps {
  role: UserRole;
}

export const RoleRoute: React.FC<IRoleRouteProps> = ({ role }) => {
  const { getAuthToken, getAuthRole } = useAuth();

  const token = getAuthToken();
  const userRole = getAuthRole();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (!userRole) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole !== role) {
    return (
      <Navigate
        to={userRole === "admin" ? "/dashboard" : "/student/card"}
        replace
      />
    );
  }

  return <Outlet />;
};