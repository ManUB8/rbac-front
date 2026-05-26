import React, { useMemo, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import Logo_samo from '../../../assets/image/logo_samo_r.jpg'
import { useAuth } from "../../../modules/auth/hook/useAuth";
import { routesConfig, type IRouterConfig, type UserRole } from "../../../router/router";
import { SIDEBAR_WIDTH } from "./Layout";
import { colorModeAtom } from "../../store/themeAtom";
import { ENUM_VERSION } from "../Enum";

export interface ISidebarMenuProps {
  role: UserRole | "";
  isMobile: boolean;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const COLLAPSED_WIDTH = 70;

const SidebarMenu: React.FC<ISidebarMenuProps> = ({
  role,
  isMobile,
  collapsed,
  drawerOpen,
  setDrawerOpen,
}) => {
  console.log('import.meta.env.VITE_IMAGE_VERSION', import.meta.env.VITE_IMAGE_VERSION)
  console.log('ENUM_VERSION', ENUM_VERSION)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogOut } = useAuth();

  const accountName = localStorage.getItem("account_name") || "";
  const studentCode = localStorage.getItem("user_code") || "";

  const [mode, setMode] = useAtom(colorModeAtom);
  const drawerWidth = collapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  const menuItems = useMemo(() => {
    if (!role) return [];

    return routesConfig.privateRoutes.filter(
      (item) => item.roles.includes(role) && item.withLayout !== false
    );
  }, [role]);

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isChildrenActive = (children?: IRouterConfig[]) => {
    return children?.some((child) => isActivePath(child.path)) ?? false;
  };

  const handleNavigate = (path?: string) => {
    if (!path) return;

    navigate(path);

    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleToggleGroup = (key: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleTheme = () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    localStorage.setItem("theme", nextMode);
  };

  const renderSingleMenu = (item: IRouterConfig) => {
    const active = isActivePath(item.path);

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
          color: active ? "primary.contrastText" : "text.primary",

          "&:hover": {
            bgcolor: active ? "primary.main" : "background.default",
          },

          "& .MuiListItemIcon-root": {
            color: active ? "primary.contrastText" : "text.secondary",
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
            slotProps={{
              primary: {
                sx: {
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                },
              },
            }}
          />
        )}
      </ListItemButton>
    );
  };

  const renderGroupMenu = (item: IRouterConfig) => {
    const childActive = isChildrenActive(item.children);
    const open = openGroups[item.key] ?? childActive;

    return (
      <Box key={item.key}>
        <ListItemButton
          onClick={() => {
            if (collapsed) {
              handleNavigate(item.children?.[0]?.path || item.path);
              return;
            }

            handleToggleGroup(item.key);
          }}
          sx={{
            mb: 0.5,
            borderRadius: "0 25px 25px 0",
            px: collapsed ? 1.5 : 2,
            justifyContent: collapsed ? "center" : "flex-start",
            bgcolor: childActive ? "action.selected" : "transparent",
            color: childActive ? "primary.main" : "text.primary",

            "&:hover": {
              bgcolor: childActive ? "action.selected" : "background.default",
            },

            "& .MuiListItemIcon-root": {
              color: childActive ? "primary.main" : "text.secondary",
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
            <>
              <ListItemText
                primary={item.name}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 14,
                      fontWeight: childActive ? 700 : 500,
                    },
                  },
                }}
              />

              {open ? (
                <ExpandLessIcon sx={{ fontSize: 20 }} />
              ) : (
                <ExpandMoreIcon sx={{ fontSize: 20 }} />
              )}
            </>
          )}
        </ListItemButton>

        {!collapsed && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ pl: 1.5 }}>
              {item.children?.map((child) => {
                const active = isActivePath(child.path);

                return (
                  <ListItemButton
                    key={child.key}
                    onClick={() => handleNavigate(child.path)}
                    sx={{
                      mb: 0.5,
                      ml: 1,
                      borderRadius: 2,
                      px: 1.5,
                      bgcolor: active ? "primary.main" : "transparent",
                      color: active ? "primary.contrastText" : "text.secondary",

                      "&:hover": {
                        bgcolor: active ? "primary.main" : "background.default",
                      },

                      "& .MuiListItemIcon-root": {
                        color: active ? "primary.contrastText" : "text.secondary",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {child.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={child.name}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: 13,
                            fontWeight: active ? 700 : 500,
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const content = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ px: 2.5, py: 2 }}>
        <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
          {/* <SchoolOutlinedIcon sx={{ color: "primary.main" }} /> */}
          {role === "admin"
            ? <Box component="img" sx={{ width: 50 }} src={Logo_samo} alt="logo_rbac" />
            : <SchoolOutlinedIcon sx={{ color: "primary.main" }} />}
          {!collapsed && (
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 15 }}>
                {role === "admin"
                  ? accountName || "ผู้ดูแลระบบ"
                  : studentCode || "นิสิต"}
              </Typography>

              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                {"ระบบทะเบียนกิจกรรม"}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                {`v. ${ENUM_VERSION}`}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 1.5, flex: 1, overflowY: "auto" }}>
        {menuItems.map((item) => {
          const hasChildren = !!item.children?.length;

          if (hasChildren) {
            return renderGroupMenu(item);
          }

          return renderSingleMenu(item);
        })}
      </List>

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <ListItemButton
          onClick={handleToggleTheme}
          sx={{
            borderRadius: 2,
            justifyContent: collapsed ? "center" : "flex-start",
            mb: 1,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 36,
              mr: collapsed ? 0 : 1,
              color: "text.secondary",
            }}
          >
            {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </ListItemIcon>

          {!collapsed && (
            <ListItemText
              primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 14,
                    fontWeight: 500,
                  },
                },
              }}
            />
          )}
        </ListItemButton>

        <ListItemButton
          onClick={handleLogOut}
          sx={{
            borderRadius: 2,
            justifyContent: collapsed ? "center" : "flex-start",
            color: "error.main",

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
              color: "error.main",
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          {!collapsed && (
            <ListItemText
              primary="Logout"
              slotProps={{
                primary: {
                  sx: {
                    fontSize: 14,
                    fontWeight: 500,
                  },
                },
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
        slotProps={{
          paper: {
            sx: {
              width: SIDEBAR_WIDTH,
            },
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
        width: drawerWidth,
        flexShrink: 0,
        transition: "width 0.2s ease",
      }}
    >
      <Box
        sx={{
          width: drawerWidth,
          position: "fixed",
          height: "100vh",
          transition: "width 0.2s ease",
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default SidebarMenu;