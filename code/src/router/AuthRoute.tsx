import React from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AppRoutes } from "./router";
import { PrivateLayoutRoute, PrivateBareRoute } from "./PrivateRoute";
import NotFoundPage from "../shared/NotFoundPage";
import LoginPage from "../modules/auth/page/LoginPage";
import LoginForm from "../modules/auth/page/LoginForm";
import { RoleRoute } from "./RoleRoute";
import PermissionRoute from "./PermissionRoute";
import { useAuth } from "../modules/auth";

/* pages */
import DashBoardPage from "../modules/dashboard/DashBoardPage";
import StudentCardPage from "../modules/student/page/StudentCardPage";

import StudentSummaryPage from "../modules/student/page/StudentSummaryPage";
import StudentManagePage from "../modules/admin/page/StudentManagePage";
import ActivityManagePage from "../modules/admin/page/ActivityManagePage";
import PermissionManagePage from "../modules/admin/page/PermissionManagePage";
import RegisterPage from "../modules/auth/page/Register";
import StudentActivityPage from "../modules/student/page/StudentActivityPage";

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

  if (role === "admin") {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  if (role === "student") {
    return <Navigate to={AppRoutes.studentCard} replace />;
  }

  return <Navigate to={AppRoutes.authLanding} replace />;
}

export default function AuthRoute() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* public */}
        <Route path={AppRoutes.authLanding} element={<LoginPage />} />
        <Route path={AppRoutes.login} element={<LoginForm />} />
        <Route path={AppRoutes.register} element={<RegisterPage />} />

        {/* private: มี Layout/Sidebar */}
        <Route path="/" element={<PrivateLayoutRoute />}>
          {/* default redirect ตาม role */}
          <Route index element={<DefaultRedirect />} />

          {/* ================= ADMIN ================= */}
          <Route element={<RoleRoute role="admin" />}>
            <Route path={AppRoutes.dashboard} element={<DashBoardPage />} />
            <Route
              path={AppRoutes.adminStudents}
              element={<StudentManagePage />}
            />
            <Route
              path={AppRoutes.adminActivities}
              element={<ActivityManagePage />}
            />
            <Route
              path={AppRoutes.adminPermissions}
              element={<PermissionManagePage />}
            />
          </Route>

          {/* ================= STUDENT ================= */}
          <Route element={<RoleRoute role="student" />}>
            <Route element={<PermissionRoute permissionKey="student_card" />}>
              <Route
                path={AppRoutes.studentCard}
                element={<StudentCardPage />}
              />
            </Route>

            <Route
              element={<PermissionRoute permissionKey="student_activity" />}
            >
              <Route
                path={AppRoutes.studentActivity}
                element={<StudentActivityPage />}
              />
            </Route>

            <Route
              element={<PermissionRoute permissionKey="student_summary" />}
            >
              <Route
                path={AppRoutes.studentSummary}
                element={<StudentSummaryPage />}
              />
            </Route>
          </Route>
        </Route>

        {/* private: ไม่มี Layout (modal / full page เฉพาะกิจ) */}
        <Route path="/" element={<PrivateBareRoute />}>
          {/* ใส่ modal routes ภายหลัง */}
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}