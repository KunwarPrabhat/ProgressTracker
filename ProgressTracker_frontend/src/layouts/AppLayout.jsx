import { Outlet, useNavigate } from "react-router-dom";
import "./AppLayout.css";

function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="app-shell">
      <nav className="app-navbar">
        <div className="nav-left">
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">← Back</button>
          <h2 className="logo">SQLMaster</h2>
        </div>

        <div className="nav-center">
          <button onClick={() => navigate("/app/leetcode")}>
            LeetCode SQL
          </button>
        </div>

        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
