import { useState } from "react";
import { saveSolution, deleteSolution } from "../api";
import "./SolutionModal.css";

function SolutionModal({ question, onClose, onSaved }) {
  const initialFromProgress = question.userProgress && question.userProgress.length > 0 ? question.userProgress[0].notes : null;
  const [solution, setSolution] = useState(initialFromProgress ?? question.solution ?? "");
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

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this solution?");
    if (!confirmed) return;

    try {
      setSaving(true);
      await deleteSolution(question.id);
      // Reset to empty and close
      setSolution("");
      onSaved({ ...question, userProgress: [] });
    } catch (err) {
      alert("Failed to delete solution");
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
          {question.userProgress && question.userProgress.length > 0 && (
            <button onClick={handleDelete} disabled={saving} className="delete-btn">
              {saving ? "Deleting..." : "Delete Solution"}
            </button>
          )}
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save & Mark Solved"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SolutionModal;
