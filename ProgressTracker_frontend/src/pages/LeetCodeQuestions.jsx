import { useEffect, useState } from "react";
import { getLeetCodeSqlQuestions } from "../api";

function LeetCodeQuestions() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getLeetCodeSqlQuestions();
      setQuestions(data);
    } catch (err) {
      setError("You are not logged in or failed to load");
    }
  }

  return (
    <div>
      <h2>LeetCode SQL 50</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.title}</td>
              <td>{q.difficulty}</td>
              <td>
                <a href={q.url} target="_blank" rel="noreferrer">
                  Open
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeetCodeQuestions;
