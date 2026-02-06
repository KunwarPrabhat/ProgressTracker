import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Question Tracker</h1>

      {/* TEMP NAV FOR TESTING */}
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
        <Link to="/questions" style={{ marginRight: 10 }}>Questions</Link>
        <Link to="/add">Add Question</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/add" element={<AddQuestion />} />
      </Routes>
    </div>
  );
}

export default App;
