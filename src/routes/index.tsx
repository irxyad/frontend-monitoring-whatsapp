import MainLayout from '@/components/layout/MainLayout';
import RootLayout from '@/components/layout/RootLayout';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import { ROUTES } from '@/core/constants/routes.constant';
import LoginPage from '@/features/auth/presentation';
import ContactsPage from '@/features/contact/presentation/ContactsPage';
import UserDashboardPage from '@/features/dashboard';
import ListMessagingPage from '@/features/messaging/presentation/ListMessagingPage';
import SendMessagePage from '@/features/messaging/presentation/SendMessagePage';
import ProfilePage from '@/features/profile/presentation';
import { RouteUtils } from '@/lib/utils/route.utils';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Root */}
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

          {/* Login */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* Main App */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<UserDashboardPage />} />
              <Route path={ROUTES.CONTACTS} element={<ContactsPage />} />

              <Route path={ROUTES.MESSAGING.PARENT}>
                <Route
                  path={RouteUtils.removeParent(ROUTES.MESSAGING.SEND_MESSAGE)}
                  element={<SendMessagePage />}
                />
                <Route
                  path={RouteUtils.removeParent(ROUTES.MESSAGING.LIST_MESSAGING)}
                  element={<ListMessagingPage />}
                />
              </Route>

              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
          </Route>

          {/* 404  */}
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
