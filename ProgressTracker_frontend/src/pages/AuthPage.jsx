import { useState } from "react";
import { login, register } from "../api";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {
    const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/questions");
      } else {
        await register(email, password);
        alert("Registered! You can now login.");
        setIsLogin(true);
      }
    } catch (err) {
        setError(err.message || "Server error");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? (
            <span>
              Don’t have an account?{" "}
              <button onClick={() => setIsLogin(false)}>Register</button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
