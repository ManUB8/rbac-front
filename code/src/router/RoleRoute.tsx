import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth";
import { getDefaultRouteByRole, type UserRole } from "./router";

interface IRoleRouteProps {
  roles: UserRole[];
  children?: ReactNode;
}

export const RoleRoute: React.FC<IRoleRouteProps> = ({ roles, children }) => {
  const { getAuthRole } = useAuth();
  const currentRole = getAuthRole();

  if (!currentRole) {
    return <Navigate to={getDefaultRouteByRole("")} replace />;
  }

  if (!roles.includes(currentRole)) {
    return <Navigate to={getDefaultRouteByRole(currentRole)} replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
};
