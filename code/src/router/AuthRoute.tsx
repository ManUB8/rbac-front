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
} from "./router";

function ScrollToTop() {
  const location = useLocation();

  React.useLayoutEffect(() => {
    const resetScroll = () => {
      const el = document.querySelector(
        ".main-center-container"
      ) as HTMLElement | null;

      el?.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };

    resetScroll();

    requestAnimationFrame(resetScroll);

    const timer = setTimeout(resetScroll, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.key]);

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

// function renderProtectedRoutesByRole(role: UserRole, withLayout: boolean) {
//   const targetRoutes = withLayout
//     ? getLayoutRoutesByRole(role)
//     : getBareRoutesByRole(role);

//   return targetRoutes.map((route) => {
//     const element = route.permissionKey ? (
//       <PermissionRoute permissionKey={route.permissionKey}>
//         {route.element}
//       </PermissionRoute>
//     ) : (
//       route.element
//     );

//     return <Route key={route.key} path={route.path} element={element} />;
//   });
// }

function flattenRoutes(routes: typeof routesConfig.privateRoutes) {
  return routes.flatMap((route) => {
    const children = route.children ?? [];

    // ถ้า route แม่ไม่มี element ให้เอาเฉพาะ children
    if (!route.element) {
      return children;
    }

    return [route, ...children];
  });
}

function renderProtectedRoutes(withLayout: boolean) {
  const targetRoutes = routesConfig.privateRoutes.filter((route) =>
    withLayout ? route.withLayout !== false : route.withLayout === false
  );

  const flatRoutes = flattenRoutes(targetRoutes);

  return flatRoutes.map((route) => {
    const element = route.permissionKey ? (
      <PermissionRoute permissionKey={route.permissionKey}>
        {route.element}
      </PermissionRoute>
    ) : (
      route.element
    );

    return (
      <Route
        key={route.key}
        path={route.path}
        element={<RoleRoute roles={route.roles}>{element}</RoleRoute>}
      />
    );
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

          {renderProtectedRoutes(true)}
        </Route>

        {/* private bare */}
        <Route path="/" element={<PrivateBareRoute />}>
          {renderProtectedRoutes(false)}
        </Route>

        {/* fallback */}
        <Route path="*" element={routesConfig.publicRoutes.find(r => r.path === AppRoutes.notFoundPage)?.element ?? <Navigate to={AppRoutes.authLanding} replace />} />
      </Routes>
    </Router>
  );
}
