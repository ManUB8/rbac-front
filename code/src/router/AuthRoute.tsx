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
  type UserRole,
  type IRouterConfig,
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

function filterRoutesByRole(
  routes: IRouterConfig[],
  role: UserRole,
  withLayout: boolean
): IRouterConfig[] {
  return routes
    .filter((route) => route.roles.includes(role) && (withLayout ? route.withLayout !== false : route.withLayout === false))
    .map((route) => ({
      ...route,
      children: route.children
        ? filterRoutesByRole(route.children, role, withLayout)
        : undefined,
    }));
}

function renderRouteTree(routes: IRouterConfig[]) {
  return routes.map((route) => {
    const element = route.permissionKey ? (
      <PermissionRoute permissionKey={route.permissionKey}>
        {route.element}
      </PermissionRoute>
    ) : (
      route.element
    );

    return (
      <Route key={route.key} path={route.path} element={element}>
        {route.children && route.children.length > 0
          ? renderRouteTree(route.children)
          : null}
      </Route>
    );
  });
}

function renderProtectedRoutesByRole(role: UserRole, withLayout: boolean) {
  const targetRoutes = filterRoutesByRole(routesConfig.privateRoutes, role, withLayout);
  return renderRouteTree(targetRoutes);
}

export default function AuthRoute() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {routesConfig.publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route path="/" element={<PrivateLayoutRoute />}>
          <Route index element={<DefaultRedirect />} />

          <Route element={<RoleRoute role="admin" />}>
            {renderProtectedRoutesByRole("admin", true)}
          </Route>

          <Route element={<RoleRoute role="student" />}>
            {renderProtectedRoutesByRole("student", true)}
          </Route>
        </Route>

        <Route path="/" element={<PrivateBareRoute />}>
          <Route element={<RoleRoute role="admin" />}>
            {renderProtectedRoutesByRole("admin", false)}
          </Route>

          <Route element={<RoleRoute role="student" />}>
            {renderProtectedRoutesByRole("student", false)}
          </Route>
        </Route>

        <Route
          path="*"
          element={
            routesConfig.publicRoutes.find((r) => r.path === AppRoutes.notFoundPage)
              ?.element ?? <Navigate to={AppRoutes.authLanding} replace />
          }
        />
      </Routes>
    </Router>
  );
}