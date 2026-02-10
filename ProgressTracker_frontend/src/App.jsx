import { Routes, Route, Link } from "react-router-dom";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import LeetCodeQuestions from "./pages/LeetCodeQuestions";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Question Tracker</h1>

      {/* TEMP NAV FOR TESTING */}
      <nav style={{ marginBottom: 20 }}>
        <Link to="/leetcode" style={{ marginRight: 10 }}>
          LeetCode SQL
        </Link>
        <Link to="/questions" style={{ marginRight: 10 }}>Questions</Link>
        <Link to="/add">Add Question</Link>
      </nav>

      <Routes>
        <Route path="/leetcode" element={<LeetCodeQuestions />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/add" element={<AddQuestion />} />
      </Routes>
    </div>
  );
}

export default App;
