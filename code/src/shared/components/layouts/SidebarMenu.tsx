import React, { useMemo } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useLocation, useNavigate } from "react-router-dom";

import { SIDEBAR_COLLAPSED, SIDEBAR_WIDTH } from "./Layout";
import { sidebarMenuConfig } from "./sidebarMenuConfig";

import { usePermission } from "../../../modules/auth/hook/usePermission";
import { useAuth } from "../../../modules/auth";

import type { UserRole } from "../../../modules/auth/hook/useAuth";

interface ISidebarMenuProps {
  role: UserRole | "";
  isMobile: boolean;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarMenu: React.FC<ISidebarMenuProps> = ({
  role,
  isMobile,
  collapsed,
  setCollapsed,
  drawerOpen,
  setDrawerOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getStudentPermissions } = usePermission();
  const { handleLogOut } = useAuth();

  const studentPermissions = getStudentPermissions();

  const menuItems = useMemo(() => {
    return sidebarMenuConfig.filter((item) => {
      if (!role) return false;
      if (!item.roles.includes(role)) return false;

      if (role === "student" && item.permissionKey) {
        return studentPermissions[item.permissionKey];
      }

      return true;
    });
  }, [role, studentPermissions]);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH;

  const menuContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          height: 72,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed && !isMobile ? "center" : "space-between",
        }}
      >
        {(!collapsed || isMobile) && (
          <Box>
            <Typography fontWeight={800} fontSize={18}>
              {role === "admin" ? "Admin Panel" : "Student Portal"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {role === "admin"
                ? "จัดการระบบกิจกรรม"
                : "ระบบสำหรับนิสิต"}
            </Typography>
          </Box>
        )}

        {!isMobile && (
          <IconButton onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? <MenuOutlinedIcon /> : <MenuOpenOutlinedIcon />}
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* MENU */}
      <List sx={{ px: 1.5, py: 1.5, flex: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.key}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setDrawerOpen(false);
              }}
              sx={{
                minHeight: 48,
                mb: 0.75,
                px: collapsed && !isMobile ? 1.25 : 1.5,
                borderRadius: 2,
                justifyContent:
                  collapsed && !isMobile ? "center" : "flex-start",
                bgcolor: active ? "action.selected" : "transparent",
                color: active ? "primary.main" : "text.primary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed && !isMobile ? 0 : 36,
                  mr: collapsed && !isMobile ? 0 : 1,
                  color: active ? "primary.main" : "text.secondary",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {(!collapsed || isMobile) && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: active ? 700 : 500,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* FOOTER */}
      <Divider />

      <Box sx={{ p: 1.5 }}>
        <ListItemButton
          onClick={() => {
            handleLogOut();
          }}
          sx={{
            borderRadius: 2,
            justifyContent: collapsed && !isMobile ? "center" : "flex-start",
            "&:hover": {
              bgcolor: "error.main",
              color: "white",
              "& .MuiListItemIcon-root": {
                color: "white",
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed && !isMobile ? 0 : 36,
              mr: collapsed && !isMobile ? 0 : 1,
              color: "text.secondary",
              justifyContent: "center",
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          {(!collapsed || isMobile) && (
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          )}
        </ListItemButton>
      </Box>
    </Box>
  );

  /* MOBILE DRAWER */
  if (isMobile) {
    return (
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {menuContent}
      </Drawer>
    );
  }

  /* DESKTOP SIDEBAR */
  return (
    <Box
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        transition: "width 0.25s ease",
      }}
    >
      <Box
        sx={{
          width: sidebarWidth,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          transition: "width 0.25s ease",
        }}
      >
        {menuContent}
      </Box>
    </Box>
  );
};