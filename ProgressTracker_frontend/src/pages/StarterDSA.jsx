import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function StarterDSA() {
  return (
    <div className="landing-shell">
      <main className="landing-hero">
        <div className="hero-content">
          <h2>Starter DSA</h2>
          <p>A gentle path into data structures and algorithms for beginners.</p>

          <div className="starter-grid">
            <div className="starter-card">
              <h4>Arrays & Strings</h4>
              <p>Basic manipulations and two-pointer techniques.</p>
            </div>
            <div className="starter-card">
              <h4>Linked Lists</h4>
              <p>Traversal, reversal, and common patterns.</p>
            </div>
            <div className="starter-card">
              <h4>Stacks & Queues</h4>
              <p>Use-cases and implementation basics.</p>
            </div>
            <div className="starter-card">
              <h4>Trees</h4>
              <p>Traversal, recursion, and simple BST ops.</p>
            </div>
            <div className="starter-card">
              <h4>Hash Maps</h4>
              <p>Frequency counting and lookups.</p>
            </div>
            <div className="starter-card">
              <h4>Sorting & Searching</h4>
              <p>Basic sorts and binary search patterns.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
