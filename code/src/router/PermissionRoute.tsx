import { Navigate, Outlet } from "react-router-dom";
import { usePermission } from "../modules/auth/hook/usePermission";
import type { StudentPagePermissionKey } from "../shared/types/menu";

interface IPermissionRouteProps {
  permissionKey: StudentPagePermissionKey;
}

const PermissionRoute: React.FC<IPermissionRouteProps> = ({ permissionKey }) => {
  const { getStudentPermissions } = usePermission();
  const permissions = getStudentPermissions();

  if (!permissions[permissionKey]) {
    return <Navigate to="/student/card" replace />;
  }

  return <Outlet />;
};

export default PermissionRoute;