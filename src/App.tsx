import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LandingPageView from "./components/views/LandingPageView";
import View404 from "./components/views/View404";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { useAuthContext } from "./api/api_hooks/useAuthContext";
import DashboardView from "./components/views/DashboardView";

import MainTemplate from "./components/templates/MainTemplate";

import RankingView from "./components/views/RankingView";
import WritePiViewWithKey from "./components/views/WritePiView";
import UserProfileView from "./components/views/UserProfileView";

const App = () => {
  const { user } = useAuthContext();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<DashboardView />}>
              <Route path="/" element={<MainTemplate />}>
                <Route index element={<WritePiViewWithKey />} />
                <Route path="/rank" element={<RankingView/>} />
                <Route path="/settings" element={<UserProfileView />} />
              </Route>
            </Route>
          </Route>
          <Route
            path="/auth"
            element={!user ? <LandingPageView /> : <Navigate to="/" />}
          />
          <Route path="*" element={<View404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
