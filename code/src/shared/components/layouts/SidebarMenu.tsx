import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../modules/auth/hook/useAuth";
import { type UserRole } from "../../../router/router";
import { SIDEBAR_COLLAPSED, SIDEBAR_WIDTH } from "./Layout";
import DrawerMenuBody from "../drawer/DrawerMenuBody";


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
  const { handleLogOut } = useAuth();

  const sidebarWidth = isMobile
    ? SIDEBAR_WIDTH
    : collapsed
    ? SIDEBAR_COLLAPSED
    : SIDEBAR_WIDTH;

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const content = (
    <Box
      sx={(theme) => ({
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
      })}
    >
      <Box
        sx={{
          height: 72,
          px: collapsed && !isMobile ? 1 : 2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed && !isMobile ? "center" : "space-between",
          flexShrink: 0,
        }}
      >
        {(!collapsed || isMobile) && (
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={800} fontSize={18} noWrap>
              {role === "admin" ? "Admin Panel" : "Student Portal"}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
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

      <DrawerMenuBody
        role={role}
        collapsed={collapsed && !isMobile}
        onNavigate={(path) => handleNavigate(path)}
      />

      <Divider />

      <Box sx={{ p: 1.5, flexShrink: 0 }}>
        <ListItemButton
          onClick={handleLogOut}
          sx={{
            minHeight: 48,
            borderRadius: 2,
            justifyContent: collapsed && !isMobile ? "center" : "flex-start",
            px: collapsed && !isMobile ? 1.25 : 1.5,
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
          overflow: "hidden",
          transition: "width 0.25s ease",
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default SidebarMenu;