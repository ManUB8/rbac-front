// AuthRoute.tsx
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { routesConfig, AppRoutes } from './router';
import { PrivateLayoutRoute, PrivateBareRoute } from './PrivateRoute';
import NotFoundPage from '../shared/NotFoundPage';
import LoginPage from '../modules/auth/page/LoginPage';
import { collectRoutesByModalFlag } from './RoutesByModalFlag';
import LoginForm from '../modules/auth/page/LoginForm';
import React from 'react';

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

export default function AuthRoute() {
    const { normal, modal } = collectRoutesByModalFlag(routesConfig.privateRoutes);

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* public */}
                <Route path={AppRoutes.authLanding} element={<LoginPage />} />
                <Route path={AppRoutes.login} element={<LoginForm />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* private: มี Layout/Sidebar */}
                <Route path="/" element={<PrivateLayoutRoute />}>
                    {normal.map(r => (
                        <Route key={String(r.path)} path={r.path as string} element={r.element} />
                    ))}
                </Route>

                {/* private: ไม่มี Layout (ModalHeader เต็มหน้า) */}
                <Route path="/" element={<PrivateBareRoute />}>
                    {modal.map(r => (
                        <Route key={String(r.path)} path={r.path as string} element={r.element} />
                    ))}
                </Route>
            </Routes>
        </Router>
    );
}