import {
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import React, { useEffect, useState, type ReactNode } from 'react';
import MainContent from './MainContent';
import { SidebarMenu } from './SidebarMenu';
import { useAuth } from '../../../modules/auth/hook/useAuth';

export interface ILayoutProps {
    children: ReactNode;
}

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED = 90;
export const FOOTER_H = 64;
export const MOBILE_HEADER_H = 56;

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const [collapsed, setCollapsed] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const { getAuthRole } = useAuth();
    const role = getAuthRole();

    useEffect(() => {
        if (!isMobile) setDrawerOpen(false);
    }, [isMobile]);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <SidebarMenu
                role={role}
                isMobile={isMobile}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
            />

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {isMobile && (
                    <Box
                        sx={{
                            height: MOBILE_HEADER_H,
                            px: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1200,
                        }}
                    >
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuOutlinedIcon />
                        </IconButton>

                        <Typography fontSize={16} fontWeight={700}>
                            {role === 'admin' ? 'Admin Panel' : 'Student Portal'}
                        </Typography>

                        <Box sx={{ width: 40 }} />
                    </Box>
                )}

                <MainContent
                    isMobile={isMobile}
                    bottomOffset={isMobile ? FOOTER_H : 0}
                >
                    {children}
                </MainContent>
            </Box>
        </Box>
    );
};

export default Layout;