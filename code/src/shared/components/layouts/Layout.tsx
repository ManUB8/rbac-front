import { Box, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, type ReactNode, useEffect } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import FooterMain from './FooterMain';
import DrawerMenuBar from '../drawer/DrawerMenuBar';
import { SidebarMenu } from './SidebarMenu';

export interface ILayoutProps {
    children: ReactNode;
}
export const SIDEBAR_WIDTH = 240;     // ใช้เลขเดียวทุกที่
export const SIDEBAR_COLLAPSED = 90;
export const FOOTER_H = 64;
const PAD_X = 24;
const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
    const theme = useTheme();
    const drawerWidth = 240;
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [open, setOpen] = useState<boolean>(false);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const toggleDrawer = () => setOpen(!open);

    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // ความกว้างที่ต้อง “กันพื้นที่” ให้ main
    // const sidebarVisibleWidth = isMobile
    //     ? 0
    //     : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH) + PAD_X; // รวม padding
    const sidebarW = isMobile ? 0 : (collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH);

    useEffect(() => {
        if (!isMobile) setDrawerOpen(false);
    }, [isMobile]);


    return (

        // <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', bgcolor: 'white' }}>
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'background.paper', // ✅ ปล่อยให้ตามธีม
                color: 'text.primary',         // (ถ้าต้องการ)
            }}
        >
            <SidebarMenu isMobile={isMobile} collapsed={collapsed} setCollapsed={setCollapsed} />
            <MainContent isMobile={isMobile} bottomOffset={isMobile ? FOOTER_H : 0}>
                {props.children}
            </MainContent>
            <FooterMain isMobile={isMobile} setOpenDrawer={setOpenDrawer} />
            <DrawerMenuBar open={openDrawer} setOpen={setOpenDrawer} isMobile={isMobile} />
        </Box>
    );
};

export default Layout;
