import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import StarterDSA from "./pages/StarterDSA";
import Blind75 from "./pages/Blind75";
import PrepSide from "./pages/PrepSide";
import AppLayout from "./layouts/AppLayout";
import LeetCodeQuestions from "./pages/LeetCodeQuestions";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <Routes>

        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Public Auth Page */}
        <Route path="/auth" element={<AuthPage />} />
        

        {/* Protected App Area */}
        <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<StarterDSA />} />
          <Route path="leetcode" element={<LeetCodeQuestions />} />
        </Route>

        {/* Public learning pages */}
        <Route path="/starter-dsa" element={<StarterDSA />} />
        <Route path="/blind-75" element={<Blind75 />} />
        <Route path="/prepside" element={<PrepSide />} />

      </Routes>
  );
}

export default App;
