import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="logo">LeetCode SQL</div>

      <div className="nav-links">
        <button onClick={() => navigate("/app/leetcode")}>
          LeetCode SQL
        </button>
      </div>
    </div>
  );
};

export default Navbar;
