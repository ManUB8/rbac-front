import type { ReactNode } from "react";
import type { RouteObject } from "react-router";

import NotFoundPage from "../shared/NotFoundPage";
import LoginPage from "../modules/auth/page/LoginPage";
import LoginForm from "../modules/auth/page/LoginForm";
import RegisterPage from "../modules/auth/page/Register";

import DashBoardPage from "../modules/dashboard/DashBoardPage";
import StadiumOutlinedIcon from '@mui/icons-material/StadiumOutlined';
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import StudentCardPage from "../modules/student/StudentMaster/page/StudentCardPage";
import StudentActivityPage from "../modules/student/StudentActivity/page/StudentActivityPage";
import StudentSummaryPage from "../modules/student/Dashboard/ActivitySummary/page/StudentSummaryPage";
import StudentManagePage from "../modules/admin/StudentManage/page/StudentManagePage";
import ActivityManagePage from "../modules/admin/ActivityManage/page/ActivityManagePage";
import FacultyBranchPage from "../modules/admin/Faculty_Majors/page/FacultyBranchPage";
import StudentActivitiesPage from "../modules/admin/Student_Activities/page/StudentActivitiesPage";

export type UserRole = "admin" | "student";

export interface IRouterConfig {
  path: string;
  element: ReactNode;
  code: string;
  name: string;
  icon?: ReactNode;
  roles: UserRole[];
  key: string;
  permissionKey?: string;
  withLayout?: boolean;
}

export const AppRoutes = {
  default: "/",
  authLanding: "/auth",
  login: "/login",
  register: "/register",
  notFoundPage: "*",

  dashboard: "/dashboard",

  // student
  studentCard: "/student/card",
  studentActivity: "/student/activity",
  studentSummary: "/student/summary",

  // admin
  adminStudents: "/admin/students",
  adminActivities: "/admin/activities",
  adminPermissions: "/admin/permissions",
  adminBranchFaculty: "/admin/branchfaculty",
  adminStudentActivities: "/admin/student-activities",
} as const;

export const getDefaultRouteByRole = (role: UserRole | "") => {
  switch (role) {
    case "admin":
      return AppRoutes.dashboard;
    case "student":
      return AppRoutes.studentCard;
    default:
      return AppRoutes.authLanding;
  }
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
      roles: ["admin"],
      key: "dashboard",
      withLayout: true,
    },
    {
      path: AppRoutes.studentCard,
      element: <StudentCardPage />,
      code: "student-card",
      name: "บัตรนิสิต",
      icon: <BadgeOutlinedIcon />,
      roles: ["student"],
      key: "student-card",
      permissionKey: "student_card",
      withLayout: true,
    },
    {
      path: AppRoutes.studentActivity,
      element: <StudentActivityPage />,
      code: "student-activity",
      name: "กิจกรรม",
      icon: <EventAvailableOutlinedIcon />,
      roles: ["student"],
      key: "student-activity",
      permissionKey: "student_activity",
      withLayout: true,
    },
    {
      path: AppRoutes.studentSummary,
      element: <StudentSummaryPage />,
      code: "student-summary",
      name: "ผลรวมเข้ากิจกรรม",
      icon: <AssessmentOutlinedIcon />,
      roles: ["student"],
      key: "student-summary",
      permissionKey: "student_summary",
      withLayout: true,
    },
    {
      path: AppRoutes.adminStudents,
      element: <StudentManagePage />,
      code: "admin-students",
      name: "จัดการนิสิต",
      icon: <GroupOutlinedIcon />,
      roles: ["admin"],
      key: "admin-students",
      withLayout: true,
    },
    {
      path: AppRoutes.adminActivities,
      element: <ActivityManagePage />,
      code: "admin-activities",
      name: "จัดการกิจกรรม",
      icon: <EventAvailableOutlinedIcon />,
      roles: ["admin"],
      key: "admin-activities",
      withLayout: true,
    },
    {
      path: AppRoutes.adminBranchFaculty,
      element: <FacultyBranchPage />,
      code: "admin-branchfaculty",
      name: "จัดการคณะสาขา",
      icon: <ApartmentOutlinedIcon />,
      roles: ["admin"],
      key: "admin-branchfaculty",
      withLayout: true,
    },
    {
      path: AppRoutes.adminStudentActivities,
      element: <StudentActivitiesPage />,
      code: "admin-studentactivities",
      name: "ลงทะเบียนเข้าร่วมกิจกรรม",
      icon: <StadiumOutlinedIcon />,
      roles: ["admin"],
      key: "admin-studentactivities",
      withLayout: true,
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

export const getPrivateRoutesByRole = (role: UserRole | "") => {
  if (!role) return [];
  return routesConfig.privateRoutes.filter((route) => route.roles.includes(role));
};

export const getLayoutRoutesByRole = (role: UserRole | "") => {
  return getPrivateRoutesByRole(role).filter((route) => route.withLayout !== false);
};

export const getBareRoutesByRole = (role: UserRole | "") => {
  return getPrivateRoutesByRole(role).filter((route) => route.withLayout === false);
};