import { useEffect, useState } from "react";
import { getQuestions, createQuestion } from "../api";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      alert("You are not logged in");
      window.location.href = "/login";
    }
  }

  async function handleAdd(e) {
    e.preventDefault();

    await createQuestion({
      title,
      leetCodeUrl: "",
      notes: "",
      isCompleted: false
    });

    setTitle("");
    loadQuestions();
  }

  return (
    <div>
      <h2>Your Questions</h2>

      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New question title"
        />
        <button>Add</button>
      </form>

      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            {q.title} {q.isCompleted ? "✅" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
