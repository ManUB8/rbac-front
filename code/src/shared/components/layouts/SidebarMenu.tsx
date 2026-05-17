import React, { useMemo } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../modules/auth/hook/useAuth";
import { routesConfig, type UserRole } from "../../../router/router";
import { SIDEBAR_WIDTH } from "./Layout";

export interface ISidebarMenuProps {
  role: UserRole | "";
  isMobile: boolean;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenu: React.FC<ISidebarMenuProps> = ({
  role,
  isMobile,
  collapsed,
  drawerOpen,
  setDrawerOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogOut } = useAuth();

  const menuItems = useMemo(() => {
    if (!role) return [];

    return routesConfig.privateRoutes.filter(
      (item) => item.roles.includes(role) && item.withLayout !== false
    );
  }, [role]);

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) setDrawerOpen(false);
  };

  const content = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        borderRight: "1px solid #eee",
      }}
    >
      {/* HEADER */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <SchoolOutlinedIcon sx={{ color: "primary.main" }} />

          {!collapsed && (
            <Box>
              <Typography fontWeight={800} fontSize={15}>
                RBAC Activity
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                ระบบทะเบียนกิจกรรม
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      <Divider />

      {/* MENU */}
      <List sx={{ px: 1, py: 1.5, flex: 1 }}>
        {menuItems.map((item) => {
          const active =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <ListItemButton
              key={item.key}
              onClick={() => handleNavigate(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: "0 25px 25px 0",
                px: collapsed ? 1.5 : 2,
                justifyContent: collapsed ? "center" : "flex-start",

                bgcolor: active ? "primary.main" : "transparent",
                color: active ? "#fff" : "text.primary",

                "&:hover": {
                  bgcolor: active ? "primary.main" : "#f5f5f5",
                },

                "& .MuiListItemIcon-root": {
                  color: active ? "#fff" : "text.secondary",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 36,
                  mr: collapsed ? 0 : 1,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      {/* USER INFO
      {!collapsed && (
        <Box
          sx={{
            px: 2,
            py: 2,
            mx: 1.5,
            mb: 1,
            borderRadius: 3,
            bgcolor: "#f8f9fb",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "primary.main",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              {role === "admin" ? "A" : "S"}
            </Box>

            <Box>
              <Typography fontSize={12} color="text.secondary">
                เข้าใช้งานในชื่อ
              </Typography>

              <Typography fontWeight={700} fontSize={14}>
                {role === "admin" ? "ผู้ดูแลระบบ" : "นิสิต"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )} */}

      {/* LOGOUT */}
      <Box sx={{ p: 1.5 }}>
        <ListItemButton
          onClick={handleLogOut}
          sx={{
            borderRadius: 2,
            justifyContent: collapsed ? "center" : "flex-start",

            "&:hover": {
              bgcolor: "error.main",
              color: "#fff",

              "& .MuiListItemIcon-root": {
                color: "#fff",
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 36,
              mr: collapsed ? 0 : 1,
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          {!collapsed && <ListItemText primary="Logout" />}
        </ListItemButton>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: SIDEBAR_WIDTH } }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        width: collapsed ? 70 : SIDEBAR_WIDTH,
        transition: "0.2s",
      }}
    >
      <Box
        sx={{
          width: collapsed ? 70 : SIDEBAR_WIDTH,
          position: "fixed",
          height: "100vh",
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default SidebarMenu;