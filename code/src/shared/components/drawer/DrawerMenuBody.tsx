// DrawerMenuBody.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Menu, MenuItem } from "react-pro-sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { routesConfig } from "../../../router/router";
import { useLocation } from "react-router";

type RouteItem = {
  path?: string;
  code?: string;
  name: string;
  icon?: React.ReactNode;
  subpath?: boolean;
  children?: RouteItem[];
  childrens?: RouteItem[];
};

export default function DrawerMenuBody({
  onNavigate,
}: {
  onNavigate: (path: string, name: string) => void;
}) {
  const theme = useTheme();
  const { pathname } = useLocation();

  const [activeParentKey, setActiveParentKey] = useState<string | null>(null);
  const [activeChildKey, setActiveChildKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const parents: RouteItem[] = useMemo(() => routesConfig.privateRoutes ?? [], []);

  const syncStateFromPath = (path: string) => {
    let parentKey: string | null = null;
    let childKey: string | null = null;
    let selected: string | null = null;

    for (const parent of parents) {
      const pKey = parent.path || parent.code || parent.name;

      if (parent.path && path.startsWith(parent.path)) {
        parentKey = pKey;
        selected = pKey;
      }

      if (!Array.isArray(parent.children)) continue;

      for (const child of parent.children) {
        const cKey = child.path || child.code || child.name;

        if (child.path && path.startsWith(child.path)) {
          parentKey = pKey;
          childKey = cKey;
          selected = cKey;
        }

        if (!Array.isArray(child.childrens)) continue;

        for (const g of child.childrens) {
          const gKey = g.path || g.code || g.name;

          if (g.path && path.startsWith(g.path)) {
            parentKey = pKey;
            childKey = cKey;
            selected = gKey;
          }
        }
      }
    }

    setActiveParentKey(parentKey);
    setActiveChildKey(childKey);
    setSelectedKey(selected);
  };

  useEffect(() => {
    syncStateFromPath(pathname);
  }, [pathname, parents]);

  const activeParent = useMemo(
    () => parents.find((r) => (r.path || r.code || r.name) === activeParentKey),
    [parents, activeParentKey]
  );

  const level1Children: RouteItem[] = useMemo(() => {
    if (!activeParent?.children) return [];
    return activeParent.children.filter((c) => !c.subpath);
  }, [activeParent]);

  const activeChild = useMemo(() => {
    if (!activeParent?.children) return undefined;
    return activeParent.children.find(
      (c) => (c.path || c.code || c.name) === activeChildKey
    );
  }, [activeParent, activeChildKey]);

  const level2Children: RouteItem[] = useMemo(() => {
    if (!activeChild?.childrens) return [];
    return activeChild.childrens.filter((c) => !c.subpath);
  }, [activeChild]);

  const selectedBg = theme.palette.secondaryContainer;
  const selectedColor = theme.palette.onSecondaryContainer;

  const menuItemStyles = {
    button: ({ level, active }: any) => ({
      height: level === 0 ? 56 : 48,
      padding: level === 0 ? "0 14px" : "0 16px",
      borderRadius: 10,
      justifyContent: "flex-start",
      color: active ? selectedColor : theme.palette.text.primary,
      backgroundColor: active ? selectedBg : "transparent",
      "&:hover": {
        backgroundColor: active ? selectedBg : theme.palette.action.hover,
        color: active ? selectedColor : theme.palette.text.primary,
      },
    }),
    icon: ({ active }: any) => ({
      color: active ? selectedColor : theme.palette.text.secondary,
    }),
  };

  // ===== VIEW 0 =====
  const renderParentMenu = () => (
    <Menu menuItemStyles={menuItemStyles}>
      {parents.map((route) => {
        const children = Array.isArray(route.children)
          ? route.children.filter((c) => !c.subpath)
          : [];

        const key = route.path || route.code || route.name;
        const isSelected = selectedKey === key;

        const handleClick = () => {
          if (children.length > 0) {
            setActiveParentKey(key);
            setActiveChildKey(null);
          } else if (route.path) {
            setSelectedKey(key);
            onNavigate(route.path, route.name);
          }
        };

        return (
          <MenuItem key={key} icon={route.icon} active={isSelected} onClick={handleClick}>
            <Typography variant="subtitle2">{route.name}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );

  // ===== VIEW 1 =====
  const renderChildMenu = () => {
    if (!activeParent) return null;

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", px: 1.5, py: 1, gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => {
              setActiveParentKey(null);
              setActiveChildKey(null);
              setSelectedKey(null);
            }}
          >
            <ArrowBackOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="subtitle2">{activeParent.name}</Typography>
        </Box>

        <Menu menuItemStyles={menuItemStyles}>
          {level1Children.map((item) => {
            const key = item.path || item.code || item.name;
            const isSelected = selectedKey === key;

            const realGrandChildren = Array.isArray(item.childrens)
              ? item.childrens.filter((g) => !g.subpath)
              : [];

            const hasGrandChildren = realGrandChildren.length > 0;

            const handleClick = () => {
              if (hasGrandChildren) {
                setActiveChildKey(key);
                setSelectedKey(key);
              } else if (item.path) {
                setSelectedKey(key);
                onNavigate(item.path, item.name);
              }
            };

            return (
              <MenuItem key={key} icon={item.icon} active={isSelected} onClick={handleClick}>
                <Typography variant="subtitle2">{item.name}</Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  };

  // ===== VIEW 2 =====
  const renderGrandChildMenu = () => {
    if (!activeParent || !activeChild) return null;

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", px: 1.5, py: 1, gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => {
              setActiveChildKey(null);
              setSelectedKey(null);
            }}
          >
            <ArrowBackOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="subtitle2">{activeChild.name}</Typography>
        </Box>

        <Menu menuItemStyles={menuItemStyles}>
          {level2Children.map((item) => {
            const key = item.path || item.code || item.name;
            const isSelected = selectedKey === key;

            const handleClick = () => {
              if (item.path) {
                setSelectedKey(key);
                onNavigate(item.path, item.name);
              }
            };

            return (
              <MenuItem key={key} icon={item.icon} active={isSelected} onClick={handleClick}>
                <Typography variant="subtitle2">{item.name}</Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </>
    );
  };

  const level =
    !activeParent
      ? "level-0"
      : activeParent && activeChild && level2Children.length > 0
      ? "level-2"
      : "level-1";

  const currentView =
    level === "level-0"
      ? renderParentMenu()
      : level === "level-1"
      ? renderChildMenu()
      : renderGrandChildMenu();

  return (
    <Box sx={{ minHeight: 0 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={level}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
        >
          {currentView}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}