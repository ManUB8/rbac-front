import React from "react";
import { Sidebar } from "react-pro-sidebar";
import LogoSC from "../../../assets/image/logo/LogoSCBlack02-long.png";
import LoGo from "../../../assets/image/logo/minilogo.svg";
import Logo_sc from "../../../assets/image/logo/logo.svg";
// import LoGo from "../../../assets/image/logo/Logo_Color.png";
// import Logo_sc from "../../../assets/image/logo/SCBlack.png";
import { useAuth } from "../../../modules/auth";
import { useNavigate } from "react-router";
import SidebarHeader from "../sidebar/SidebarHeader";
import SidebarContent from "../sidebar/SidebarContent";
import SidebarFooter from "../sidebar/SidebarFooter";
import { ENUM_VERSION } from "../Enum";
import { Box, useTheme } from "@mui/material";
import { SIDEBAR_COLLAPSED, SIDEBAR_WIDTH } from "./Layout";

export interface ISidebarMenuProps {
    isMobile: boolean;
    collapsed: boolean;
    setCollapsed: (v: boolean) => void;
}

export const SidebarMenu: React.FunctionComponent<ISidebarMenuProps> = (props) => {
    const { isMobile, collapsed, setCollapsed } = props;
    const navigate = useNavigate();
    const { handleLogOut } = useAuth();
    const theme = useTheme();

    const onNavigate = (path: string, _name: string) => {
        navigate(path);
    };

    // เดสก์ท็อปเท่านั้น (มือถือใช้ Drawer)
    if (isMobile) return null;

    return (
        <Sidebar
            className="app-sidebar"
            width={`${SIDEBAR_WIDTH}px`}
            collapsedWidth={`${SIDEBAR_COLLAPSED}px`}
            collapsed={collapsed}
            backgroundColor={theme.palette.background.paper}              // ✅ ตาม theme
            transitionDuration={350}
            rootStyles={{
                width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH, // ✅ เสถียร
                boxSizing: 'border-box',
                height: "100vh",
                background: theme.palette.background.paper,                 // ✅ ตาม theme
                color: theme.palette.text.primary,                          // ✅ ตาม theme
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                borderRadius: 12,
                paddingTop: 24,
                paddingLeft: 12,
                paddingRight: 12,
                paddingBottom: 0,
                position: 'relative',
                zIndex: 1000,
                overflow: 'visible',
                borderRight: `1px solid ${theme.palette.divider}`,          // ✅ ใช้ divider
            }}
        >
            <Box className="sb-header">
                <SidebarHeader
                    collapsed={collapsed}
                    isMobile={false}
                    onToggle={() => setCollapsed(!collapsed)}                 // ✅ ใช้ state จาก Layout
                />
            </Box>

            <Box className="sb-content" sx={{ minHeight: 0, overflowY: "auto", overflowX: "visible" }}>
                <SidebarContent collapsed={collapsed} onNavigate={onNavigate} />
            </Box>

            <Box className="sb-footer" sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                <SidebarFooter
                    collapsed={collapsed}
                    version={ENUM_VERSION}
                    logoMain={LoGo}
                    logoText={Logo_sc}
                    onLogout={handleLogOut}
                />
            </Box>
        </Sidebar>
    );
};