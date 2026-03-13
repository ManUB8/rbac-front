// PrivateRoute.tsx (เฉพาะ Bare)
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../shared/components/layouts/Layout';
import { useAuth } from '../modules/auth';
import * as R from 'ramda';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { getRouteNameByPath } from './RoutesByModalFlag';
import { ModalHeaderProvider } from '../shared/components/layouts/ModalHeaderContext';
import ModalNavHeader from '../shared/components/layouts/ModalNavHeader';

export const PrivateLayoutRoute = () => {
    const { getAuthToken } = useAuth();
    if (R.isEmpty(getAuthToken())) return <Navigate to="/auth" replace />;
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export const PrivateBareRoute = () => {
    const { getAuthToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (R.isEmpty(getAuthToken())) return <Navigate to="/auth" replace />;

    const titleFromRoute = getRouteNameByPath(location.pathname);

    // ✅ ตรวจจับมือถือ
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // ใช้ค่าคงที่เดียวกับใน ModalNavHeader
    const HEADER_H = 64;
    const FOOTER_H = 72;

    return (
        <Box sx={{ bgcolor: 'background.paper', }}>
            <ModalHeaderProvider
                initialTitle={titleFromRoute}
                onClose={() => { navigate(-1) }}
                renderHeader={(title, actions, onClose) => (
                    <ModalNavHeader
                        title={title}
                        actions={actions}
                        onClose={onClose}
                        isMobile={isMobile}   // ✅ ส่งสถานะมือถือเข้าไป
                    />
                )}
            >
                {/* กันพื้นที่หัว + เท้า (เฉพาะมือถือ) */}
                <Container
                    sx={{
                        bgcolor: 'background.paper',
                        mt: HEADER_H / 8,              // 8 → 64px
                        pb: isMobile ? FOOTER_H / 8 : 2, // 9 → 72px หรือ 16px
                    }}

                >
                    <Outlet />
                </Container>
            </ModalHeaderProvider>
        </Box>
    );
};