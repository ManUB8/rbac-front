import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { PrivateLayoutRoute, PrivateBareRoute } from "./PrivateRoute";
import { RoleRoute } from "./RoleRoute";
import PermissionRoute from "./PermissionRoute";
import { useAuth } from "../modules/auth";

import {
  AppRoutes,
  routesConfig,
  getDefaultRouteByRole,
  getLayoutRoutesByRole,
  getBareRoutesByRole,
  type UserRole,
} from "./router";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    const el =
      (document.querySelector(".main-center-container") as HTMLElement | null) ??
      (document.scrollingElement as HTMLElement | null);

    el?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function DefaultRedirect() {
  const { getAuthToken, getAuthRole } = useAuth();

  const token = getAuthToken();
  const role = getAuthRole();

  if (!token) {
    return <Navigate to={AppRoutes.authLanding} replace />;
  }

  return <Navigate to={getDefaultRouteByRole(role)} replace />;
}

function renderProtectedRoutesByRole(role: UserRole, withLayout: boolean) {
  const targetRoutes = withLayout
    ? getLayoutRoutesByRole(role)
    : getBareRoutesByRole(role);

  return targetRoutes.map((route) => {
    const element = route.permissionKey ? (
      <PermissionRoute permissionKey={route.permissionKey}>
        {route.element}
      </PermissionRoute>
    ) : (
      route.element
    );

    return <Route key={route.key} path={route.path} element={element} />;
  });
}

export default function AuthRoute() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* public */}
        {routesConfig.publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* private with layout */}
        <Route path="/" element={<PrivateLayoutRoute />}>
          <Route index element={<DefaultRedirect />} />

          <Route element={<RoleRoute role="admin" />}>
            {renderProtectedRoutesByRole("admin", true)}
          </Route>

          <Route element={<RoleRoute role="student" />}>
            {renderProtectedRoutesByRole("student", true)}
          </Route>
        </Route>

        {/* private bare */}
        <Route path="/" element={<PrivateBareRoute />}>
          <Route element={<RoleRoute role="admin" />}>
            {renderProtectedRoutesByRole("admin", false)}
          </Route>

          <Route element={<RoleRoute role="student" />}>
            {renderProtectedRoutesByRole("student", false)}
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={routesConfig.publicRoutes.find(r => r.path === AppRoutes.notFoundPage)?.element ?? <Navigate to={AppRoutes.authLanding} replace />} />
      </Routes>
    </Router>
  );
}