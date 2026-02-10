import { useState } from "react";
import { saveSolution } from "../api";
import "./SolutionModal.css";

function SolutionModal({ question, onClose, onSaved }) {
  const [solution, setSolution] = useState(question.solution || "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    try {
      setSaving(true);

      const updated = await saveSolution(question.id, solution);

      onSaved(updated);
    } catch (err) {
      alert("Failed to save solution");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>{question.title}</h2>

        <textarea
          placeholder="Paste your SQL solution here..."
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          spellCheck="false"
        />

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save & Mark Solved"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SolutionModal;
