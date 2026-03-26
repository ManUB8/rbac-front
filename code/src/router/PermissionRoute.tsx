import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "./router";

interface IPermissionRouteProps {
  permissionKey: string;
  children: React.ReactNode;
}

const PermissionRoute: React.FC<IPermissionRouteProps> = ({
  permissionKey,
  children,
}) => {
  // TODO: ใส่ logic permission จริงตรงนี้
  // ตัวอย่าง:
  // const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  // const allowed = permissions.includes(permissionKey);

  const allowed = true;

  if (!allowed) {
    return <Navigate to={AppRoutes.default} replace />;
  }

  return <>{children}</>;
};

export default PermissionRoute;