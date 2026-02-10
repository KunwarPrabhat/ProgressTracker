import { useEffect, useRef, useState } from "react";
import { getLeetCodeSqlQuestions } from "../api";
import SolutionModal from "../components/SolutionModal";
import "./LeetCodeQuestions.css";

function LeetCodeQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    async function load() {
      const data = await getLeetCodeSqlQuestions();
      setQuestions(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
      // Show all cards at the same time (no stagger/delay)
      const cards = document.querySelectorAll(".lc-card");
      cards.forEach((card) => {
        card.style.transitionDelay = `0ms`;
        card.classList.add("show");
      });

      // No observer needed for uniform reveal
      return;
    }, [questions]);


  function getCardClass(q) {
    if (q.userProgress && q.userProgress.length > 0) return "lc-card solved";
    if (q.difficulty === "Easy") return "lc-card easy";
    if (q.difficulty === "Medium") return "lc-card medium";
    if (q.difficulty === "Hard") return "lc-card hard";
    return "lc-card";
  }

  function handleSolved(updated) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
    setActiveQuestion(null);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="lc-page">
      <h1>LeetCode SQL</h1>

      <div className="lc-grid">
        {questions.map((q, i) => (
          <div
            key={q.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`${getCardClass(q)} hidden`}
          >
            <div className="lc-title">{q.title}</div>

            <div className="lc-meta">
              <span className="difficulty">{q.difficulty}</span>
              {q.userProgress && q.userProgress.length > 0 && <span className="solved-badge">Solved</span>}
            </div>

            <div className="lc-actions">
              <button
                className="open-btn"
                onClick={() => window.open(q.leetCodeUrl, "_blank")}
              >
                Open
              </button>

              <button
                className="solve-btn"
                onClick={() => setActiveQuestion(q)}
              >
                {q.userProgress && q.userProgress.length > 0 ? "View Solution" : "Add Solution"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeQuestion && (
        <SolutionModal
          question={activeQuestion}
          onClose={() => setActiveQuestion(null)}
          onSaved={handleSolved}
        />
      )}
    </div>
  );
}

export default LeetCodeQuestions;
