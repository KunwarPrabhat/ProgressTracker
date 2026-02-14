import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-shell">
      <header className="landing-nav">
        <div className="landing-left">
          <h1 className="landing-logo">SQLMaster</h1>
        </div>
        <nav className="landing-center" />
        <div className="landing-right" />
      </header>

      <main className="landing-hero">
        <div className="hero-content">
          <h2>Practice. Track. Improve.</h2>
          <p>Focused SQL & DSA practice plans, organized into curated paths.</p>

          <div className="hero-cta-row">
            <Link to="/app/leetcode" className="hero-btn">Open LeetCode SQL</Link>
          </div>
        </div>

        <div className="hero-cards">
          <Link to="/app/leetcode" className="card">
            <h3>LeetCode SQL</h3>
            <p>Curated SQL exercises with tracking and notes.</p>
          </Link>

          <Link to="/starter-dsa" className="card">
            <h3>Starter DSA</h3>
            <p>Beginner-friendly data structures and algorithms track.</p>
          </Link>

          <Link to="/blind-75" className="card">
            <h3>Blind 75</h3>
            <p>Classic interview problems to build problem-solving muscle.</p>
          </Link>

          <Link to="/prepside" className="card">
            <h3>PrepSide</h3>
            <p>Timed mocks and guided practice for interview prep.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
