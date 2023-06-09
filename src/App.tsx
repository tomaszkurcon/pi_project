import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LandingPageView from "./components/views/LandingPageView";
import View404 from "./components/views/View404";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { useAuthContext } from "./api/hooks/useAuthContext";
import DashboardView from "./components/views/DashboardView";
import SettingsView from "./components/views/SettingsView";
import MainTemplate from "./components/templates/MainTemplate";
import WritePiView from "./components/views/WritePiView";
import RankingView from "./components/views/RankingView";

const App = () => {
  const { user } = useAuthContext();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<DashboardView />}>
              <Route path="/" element={<MainTemplate />}>
                <Route index element={<WritePiView />} />
                <Route path="/rank" element={<RankingView/>} />
                <Route path="/settings" element={<SettingsView />} />
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
