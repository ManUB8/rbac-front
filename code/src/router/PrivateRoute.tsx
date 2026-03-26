import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import * as R from "ramda";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";

import { useAuth } from "../modules/auth";
import { AppRoutes } from "./router";
import { getRouteNameByPath } from "./RoutesByModalFlag";
import { ModalHeaderProvider } from "../shared/components/layouts/ModalHeaderContext";
import ModalNavHeader from "../shared/components/layouts/ModalNavHeader";
import Layout from "../shared/components/layouts/Layout";

export const PrivateLayoutRoute = () => {
  const { getAuthToken } = useAuth();

  if (R.isEmpty(getAuthToken())) {
    return <Navigate to={AppRoutes.authLanding} replace />;
  }

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

  if (R.isEmpty(getAuthToken())) {
    return <Navigate to={AppRoutes.authLanding} replace />;
  }

  const titleFromRoute = getRouteNameByPath(location.pathname);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const HEADER_H = 64;
  const FOOTER_H = 72;

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <ModalHeaderProvider
        initialTitle={titleFromRoute}
        onClose={() => navigate(-1)}
        renderHeader={(title, actions, onClose) => (
          <ModalNavHeader
            title={title}
            actions={actions}
            onClose={onClose}
            isMobile={isMobile}
          />
        )}
      >
        <Container
          sx={{
            bgcolor: "background.paper",
            mt: HEADER_H / 8,
            pb: isMobile ? FOOTER_H / 8 : 2,
          }}
        >
          <Outlet />
        </Container>
      </ModalHeaderProvider>
    </Box>
  );
};