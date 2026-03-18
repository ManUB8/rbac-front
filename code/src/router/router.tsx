import type { RouteObject } from "react-router";
import NotFoundPage from "../shared/NotFoundPage";
import LoginPage from "../modules/auth/page/LoginPage";
import LoginForm from "../modules/auth/page/LoginForm";
import DashBoardPage from "../modules/dashboard/DashBoardPage";
import type { IRouterConfig } from "./Router.interface";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

/* test pages */
import StudentCardPage from "../modules/student/page/StudentCardPage";

import StudentSummaryPage from "../modules/student/page/StudentSummaryPage";
import StudentManagePage from "../modules/admin/page/StudentManagePage";
import ActivityManagePage from "../modules/admin/page/ActivityManagePage";
import PermissionManagePage from "../modules/admin/page/PermissionManagePage";
import RegisterPage from "../modules/auth/page/Register";
import StudentActivityPage from "../modules/student/page/StudentActivityPage";

export const AppRoutes = {
  default: "/",
  authLanding: "/auth",
  login: "/login",
  notFoundPage: "*",

  dashboard: "/dashboard",
  register:"/register",

  // student
  studentCard: "/student/card",
  studentActivity: "/student/activity",
  studentSummary: "/student/summary",

  // admin
  adminStudents: "/admin/students",
  adminActivities: "/admin/activities",
  adminPermissions: "/admin/permissions",
};

export const routesConfig: {
  privateRoutes: IRouterConfig[];
  publicRoutes: RouteObject[];
} = {
  privateRoutes: [
    {
      path: AppRoutes.dashboard,
      element: <DashBoardPage />,
      code: "dashboard",
      name: "Dashboard",
      icon: <SpaceDashboardOutlinedIcon />,
    },
    {
      path: AppRoutes.studentCard,
      element: <StudentCardPage />,
      code: "student-card",
      name: "บัตรนิสิต",
      icon: <BadgeOutlinedIcon />,
    },
    {
      path: AppRoutes.studentActivity,
      element: <StudentActivityPage />,
      code: "student-activity",
      name: "กิจกรรม",
      icon: <EventAvailableOutlinedIcon />,
    },
    {
      path: AppRoutes.studentSummary,
      element: <StudentSummaryPage />,
      code: "student-summary",
      name: "ผลรวมเข้ากิจกรรม",
      icon: <AssessmentOutlinedIcon />,
    },
    {
      path: AppRoutes.adminStudents,
      element: <StudentManagePage />,
      code: "admin-students",
      name: "จัดการนิสิต",
      icon: <GroupOutlinedIcon />,
    },
    {
      path: AppRoutes.adminActivities,
      element: <ActivityManagePage />,
      code: "admin-activities",
      name: "จัดการกิจกรรม",
      icon: <EventAvailableOutlinedIcon />,
    },
    {
      path: AppRoutes.adminPermissions,
      element: <PermissionManagePage />,
      code: "admin-permissions",
      name: "สิทธิ์การมองเห็น",
      icon: <SettingsSuggestOutlinedIcon />,
    },
  ],
  publicRoutes: [
    {
      path: AppRoutes.authLanding,
      element: <LoginPage />,
    },
    {
      path: AppRoutes.login,
      element: <LoginForm />,
    },
    {
      path: AppRoutes.register,
      element: <RegisterPage />,
    },
    {
      path: AppRoutes.notFoundPage,
      element: <NotFoundPage />,
    },
  ],
};
