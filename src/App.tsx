import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/theme/ThemeProvider";
import LandingPageView from "./components/views/LandingPageView";
import View404 from "./components/views/View404";
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>

          <Routes>
            <Route path="/auth" element={<LandingPageView />} />
            <Route path="*" element={<View404 />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
