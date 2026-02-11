import { useState } from "react";
// import { login, register } from "../api";
import { login, registerStart, verifyOtp } from "../api";

import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("auth");
  const [otp, setOtp] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/app/leetcode");
      } else {
        await registerStart(email, password);
        setStep("otp"); // 👉 GO TO OTP SCREEN
      }
    } catch (err) {
      setError(err.message || "Server error");
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");

    try {
      await verifyOtp(email, otp);
      alert("Email verified! You can now login.");
      setStep("auth");
      setIsLogin(true);
    } catch (err) {
      setError(err.message || "Invalid code");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {step === "auth" && (
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
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <h3>Enter Verification Code</h3>

            <input
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            {error && <div className="auth-error">{error}</div>}

            <button type="submit">Verify Email</button>
          </form>
        )}

        <div className="auth-toggle">
          {isLogin ? (
            <span>
              Don't have an account?{" "}
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
