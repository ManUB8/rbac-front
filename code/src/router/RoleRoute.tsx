import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth";
import { getDefaultRouteByRole, type UserRole } from "./router";

interface IRoleRouteProps {
  role: UserRole;
}

export const RoleRoute: React.FC<IRoleRouteProps> = ({ role }) => {
  const { getAuthRole } = useAuth();
  const currentRole = getAuthRole();

  if (!currentRole) {
    return <Navigate to={getDefaultRouteByRole("")} replace />;
  }

  if (currentRole !== role) {
    return <Navigate to={getDefaultRouteByRole(currentRole)} replace />;
  }

  return <Outlet />;
};