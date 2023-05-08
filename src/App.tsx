import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LandingPageView from "./components/views/LandingPageView";
import View404 from "./components/views/View404";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="*" element={<View404 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
