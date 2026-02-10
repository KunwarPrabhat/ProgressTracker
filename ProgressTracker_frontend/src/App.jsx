import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./layouts/AppLayout";
import LeetCodeQuestions from "./pages/LeetCodeQuestions";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <Routes>

        {/* Public Auth Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected App Area */}
        <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="leetcode" element={<LeetCodeQuestions />} />
        </Route>

      </Routes>
  );
}

export default App;
