import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LandingPageView from "./components/views/LandingPageView";
import View404 from "./components/views/View404";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import { useAuthContext } from "./components/hooks/useAuthContext";
import DashboardView from "./components/views/DashboardView";

const App = () => {
  const { user } = useAuthContext();
  console.log("meine usere", user);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<DashboardView />} />
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
