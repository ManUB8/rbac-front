import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

import { AppRoutes } from "../../../router/router";
import type { ISidebarMenuItem } from "../../../shared/types/menu";

export const sidebarMenuConfig: ISidebarMenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: AppRoutes.dashboard,
    icon: <SpaceDashboardOutlinedIcon />,
    roles: ["admin"],
  },
  {
    key: "admin-students",
    label: "จัดการนิสิต",
    path: AppRoutes.adminStudents,
    icon: <GroupOutlinedIcon />,
    roles: ["admin"],
  },
  {
    key: "admin-activities",
    label: "จัดการกิจกรรม",
    path: AppRoutes.adminActivities,
    icon: <EventAvailableOutlinedIcon />,
    roles: ["admin"],
  },
  {
    key: "admin-permissions",
    label: "สิทธิ์การมองเห็น",
    path: AppRoutes.adminPermissions,
    icon: <SettingsSuggestOutlinedIcon />,
    roles: ["admin"],
  },

  {
    key: "student-card",
    label: "บัตรนิสิต",
    path: AppRoutes.studentCard,
    icon: <BadgeOutlinedIcon />,
    roles: ["student"],
    permissionKey: "student_card",
  },
  {
    key: "student-activity",
    label: "กิจกรรม",
    path: AppRoutes.studentActivity,
    icon: <EventAvailableOutlinedIcon />,
    roles: ["student"],
    permissionKey: "student_activity",
  },
  {
    key: "student-summary",
    label: "การเข้าร่วมกิจกรรม",
    path: AppRoutes.studentSummary,
    icon: <AssessmentOutlinedIcon />,
    roles: ["student"],
    permissionKey: "student_summary",
  },
];