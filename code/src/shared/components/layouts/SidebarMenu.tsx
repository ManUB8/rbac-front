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

import { useAuth } from "../../../modules/auth/hook/useAuth";
import {
  routesConfig,
  type UserRole,
} from "../../../router/router";
import { SIDEBAR_COLLAPSED, SIDEBAR_WIDTH } from "./Layout";

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
  setCollapsed,
  drawerOpen,
  setDrawerOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogOut } = useAuth();

  const menuItems = useMemo(() => {
    if (!role) return [];

    return routesConfig.privateRoutes.filter((item) => {
      return item.roles.includes(role) && item.withLayout !== false;
    });
  }, [role]);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH;

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const content = (
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
      <Box
        sx={{
          height: 72,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed && !isMobile ? "center" : "space-between",
          flexShrink: 0,
        }}
      >
        {(!collapsed || isMobile) && (
          <Box sx={{ minWidth: 0 }}>
            <Typography
              fontWeight={800}
              fontSize={18}
              noWrap
            >
              {role === "admin" ? "Admin Panel" : "Student Portal"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
            >
              {role === "admin" ? "จัดการระบบกิจกรรม" : "ระบบสำหรับนิสิต"}
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

      <List
        sx={{
          px: 1.5,
          py: 1.5,
          flex: 1,
          overflowY: "auto",
        }}
      >
        {menuItems.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path + "/"));

          return (
            <ListItemButton
              key={item.key || item.code}
              onClick={() => handleNavigate(item.path)}
              sx={{
                minHeight: 48,
                mb: 0.75,
                px: collapsed && !isMobile ? 1.25 : 1.5,
                borderRadius: 2,
                justifyContent:
                  collapsed && !isMobile ? "center" : "flex-start",
                bgcolor: active ? "action.selected" : "transparent",
                color: active ? "primary.main" : "text.primary",
                transition: "all 0.2s ease",
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
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: active ? 700 : 500,
                    noWrap: true,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 1.5, flexShrink: 0 }}>
        <ListItemButton
          onClick={handleLogOut}
          sx={{
            borderRadius: 2,
            justifyContent: collapsed && !isMobile ? "center" : "flex-start",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "error.main",
              color: "common.white",
              "& .MuiListItemIcon-root": {
                color: "common.white",
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
                noWrap: true,
              }}
            />
          )}
        </ListItemButton>
      </Box>
    </Box>
  );

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
        {content}
      </Drawer>
    );
  }

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
        {content}
      </Box>
    </Box>
  );
};

export default SidebarMenu;