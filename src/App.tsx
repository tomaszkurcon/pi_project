import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LandingPageView from "./components/views/LandingPageView";
import View404 from "./components/views/View404";

import { useAuthContext } from "./api/api_hooks/useAuthContext";
import DashboardView from "./components/views/DashboardView";

import MainTemplate from "./components/templates/MainTemplate";

import RankingView from "./components/views/RankingView";
import WritePiViewWithKey from "./components/views/WritePiView";
import UserProfileView from "./components/views/UserProfileView";
import UserProfileOverview from "./components/views/user_profile/UserProfileOverview";
import UserProfileSettings from "./components/views/user_profile/UserProfileSettings";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ForgotPasswordView from "./components/views/reset_password/ForgotPasswordView";
import ResetPasswordView from "./components/views/reset_password/ResetPasswordView";
import PublicRoute from "./components/common/PublicRoute";

const App = () => {
  const { user, expiredToken } = useAuthContext();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={<ProtectedRoute user={user} expiredToken={expiredToken} />}
          >
            <Route path="/" element={<DashboardView />}>
              <Route path="/" element={<MainTemplate />}>
                <Route index element={<WritePiViewWithKey />} />
                <Route path="/rank" element={<RankingView />} />
                <Route path="/user-profile" element={<UserProfileView />}>
                  <Route path="overview" element={<UserProfileOverview />} />
                  <Route path="settings" element={<UserProfileSettings />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route element={<PublicRoute user={user} />}>
            <Route path="/auth" element={<LandingPageView />} />
            <Route path="/forgot-password" element={<ForgotPasswordView />} />
            <Route path="/reset-password" element={<ResetPasswordView />} />
          </Route>
          <Route path="*" element={<View404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
