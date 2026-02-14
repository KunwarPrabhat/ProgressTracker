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

  const [view, setView] = useState("login");
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeView = (nextView) => {
    setAnimating(true);

    setTimeout(() => {
      setView(nextView);
      setAnimating(false);
    }, 300);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
        // After successful login, send user to the Starter DSA area
        navigate("/app");
      } else {
        // await registerStart(email, password);
        // setStep("otp");
        setLoading(true);

        await registerStart(email, password);

        // trigger slide animation
        setAnimating(true);

        setTimeout(() => {
          setStep("otp");
          setAnimating(false);
          setLoading(false);
        }, 300);
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
      setAnimating(true);

      setTimeout(() => {
        setStep("auth");
        setIsLogin(true);
        setAnimating(false);
      }, 300);
    } catch (err) {
      setError(err.message || "Invalid code");
    }
  }

  return (
    <div className="auth-container">
      <div className={`auth-card ${animating ? "slide-out" : "slide-in"}`}>
        <h2 className={animating ? "fade-out" : "fade-in"}>
          {isLogin ? "Login" : "Register"}
        </h2>

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

            <button type="submit" disabled={loading}>
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Sending OTP..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
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
              <button
                onClick={() => {
                  setAnimating(true);
                  setTimeout(() => {
                    setIsLogin(false);
                    setAnimating(false);
                  }, 300);
                }}
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setAnimating(true);
                  setTimeout(() => {
                    setIsLogin(true);
                    setAnimating(false);
                  }, 300);
                }}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
