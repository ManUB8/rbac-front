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
import ActivityManagePage from "../modules/admin/ActivityManage/page/ActivityManagePage";
import FacultyBranchPage from "../modules/admin/Faculty_Majors/page/FacultyBranchPage";
import StudentActivitiesPhonePage from "../modules/admin/Student_Activities_Phone/page/StudentActivitiesPhonePage";
import Student_ManagePage from "../modules/admin/Student_Manage/page/Student_ManagePage";
import StudentReportPage from "../modules/admin/StudentReport/page/StudentReportPage";
import EventRegistrantsPage from "../modules/admin/EventRegistrants/page/EventRegistrantsPage";
import DashboardAdminPage from "../modules/admin/Dashboard_Admin/page/DashboardAdminPage";
import QrScannerPage from "../modules/admin/Qr_Scanner/page/QrScannerPage";


// icon
import ComputerIcon from '@mui/icons-material/Computer';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BuildIcon from '@mui/icons-material/Build';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import AddToHomeScreenOutlinedIcon from '@mui/icons-material/AddToHomeScreenOutlined';
import StudentActivitiesManualPage from "../modules/admin/Student_Activities_Manual/page/StudentActivitiesManualPage";
import StudentActivitiesComputerPage from "../modules/admin/Student_Activities_Computer/page/StudentActivitiesComputerPage";
import User_ManagePage from "../modules/admin/User_Manage/page/User_ManagePage";
export type UserRole = "admin" | "temporary_admin" | "student";
export type RouteRole = "admin" | "student";

export interface IRouterConfig {
  path: string;
  element?: ReactNode;
  code: string;
  name: string;
  icon?: ReactNode;
  roles: UserRole[];
  key: string;
  permissionKey?: string;
  withLayout?: boolean;
  children?: IRouterConfig[];
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
  adminStudents_last: "/admin/students-last",
  adminActivities: "/admin/activities",
  adminPermissions: "/admin/permissions",
  adminBranchFaculty: "/admin/branchfaculty",
  adminStudentActivities: "/admin/student-activities",
  adminStudentActivitiesComputer: "/admin/student-activities/computer",
  adminStudentActivitiesPhone: "/admin/student-activities/phone",
  adminStudentActivitiesManual: "/admin/student-activities/manual",
  adminEventRegistrants: "/admin/student-event",
  adminStudentReport: "/admin/student-report",
  adminEvent: "/admin/event",
  adminUser: "/admin/User",
} as const;

export const getDefaultRouteByRole = (role: UserRole | "") => {
  switch (role) {
    case "admin":
      return AppRoutes.dashboard;
    case "temporary_admin":
      return AppRoutes.adminStudentActivitiesComputer;
    case "student":
      return AppRoutes.studentCard;
    default:
      return AppRoutes.authLanding;
  }
};

export const getRouteRole = (role: UserRole | ""): RouteRole | "" => {
  if (role === "temporary_admin") return "admin";
  return role;
};

export const routesConfig: {
  privateRoutes: IRouterConfig[];
  publicRoutes: RouteObject[];
} = {
  privateRoutes: [
    {
      path: AppRoutes.dashboard,
      element: <DashboardAdminPage />,
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
      element: <Student_ManagePage />,
      code: "admin-students",
      name: "จัดการนิสิต",
      icon: <GroupsOutlinedIcon />,
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
      path: AppRoutes.adminUser,
      element: <User_ManagePage />,
      code: "admin-activities",
      name: "จัดการแอดมิน",
      icon: <AdminPanelSettingsIcon />,
      roles: ["admin"],
      key: "admin-user",
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
      element: null,
      code: "admin-studentactivities",
      name: "ลงทะเบียนกิจกรรม",
      icon: <QrCodeScannerOutlinedIcon />,
      roles: ["admin", "temporary_admin"],
      key: "admin-studentactivities",
      withLayout: true,
      children: [
        {
          path: AppRoutes.adminStudentActivitiesComputer,
          element: <StudentActivitiesComputerPage />,
          code: "admin-studentactivitiesComputer",
          name: "คอมพิวเตอร์",
          icon: <ComputerIcon />,
          roles: ["admin", "temporary_admin"],
          key: "admin-studentactivitiesComputer",
          withLayout: true,
        },
        {
          path: AppRoutes.adminStudentActivitiesPhone,
          element: <StudentActivitiesPhonePage />,
          code: "admin-studentactivitiesPhone",
          name: "โทรศัพท์",
          icon: <SmartphoneIcon />,
          roles: ["admin", "temporary_admin"],
          key: "admin-studentactivitiesPhone",
          withLayout: true,
        },
        {
          path: AppRoutes.adminStudentActivitiesManual,
          element: <StudentActivitiesManualPage />,
          code: "admin-studentactivitiesManual",
          name: "เกิดปัญหา",

          icon: <BuildIcon />,
          roles: ["admin", "temporary_admin"],
          key: "admin-studentactivitiesManual",
          withLayout: true,
        },
      ],
    },
    {
      path: AppRoutes.adminEvent,
      element: null,
      code: "admin-event-management",
      name: "จัดการลงทะเบียน",
      icon: <LocalActivityOutlinedIcon />,
      roles: ["admin"],
      key: "admin-event-management",
      withLayout: true,
      children: [
        {
          path: AppRoutes.adminEventRegistrants,
          element: <EventRegistrantsPage />,
          code: "student-event",
          name: "ผู้ลงทะเบียนกิจกรรม",
          icon: <PersonPinOutlinedIcon />,
          roles: ["admin"],
          key: "student-event",
          withLayout: true,
        },
        {
          path: AppRoutes.adminStudentReport,
          element: <StudentReportPage />,
          code: "student-report",
          name: "รายงานผู้ลงทะเบียน",
          icon: <PersonSearchOutlinedIcon />,
          roles: ["admin"],
          key: "student-report",
          withLayout: true,
        },
      ],
    }
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
