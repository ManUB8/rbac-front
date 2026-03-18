import type { ReactNode } from "react";
import type { UserRole } from "../../modules/auth/hook/useAuth";

export type StudentPagePermissionKey =
  | "student_card"
  | "student_activity"
  | "student_summary";

export interface IStudentPermissions {
  student_card: boolean;
  student_activity: boolean;
  student_summary: boolean;
}

export interface ISidebarMenuItem {
  key: string;
  label: string;
  path: string;
  icon?: ReactNode;
  roles: UserRole[];
  permissionKey?: StudentPagePermissionKey;
}