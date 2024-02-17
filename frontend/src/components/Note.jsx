/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";

function Note({ id, title, content, done, onUpdate }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteNote = async () => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE"
      });
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleDone = async () => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          done: !done
        })
      });
      onUpdate(); // Call the onUpdate function to reflect the change immediately
    } catch (error) {
      console.error("Error toggling done status:", error);
    }
  };

  if (isDeleted) {
    return null; // Don't render the note if it is deleted
  }

  return (
    <div className={`note ${done ? "done" : ""}`}>
      <h1>{title}</h1>
      <p>{content}</p>
      <div>
        <button onClick={toggleDone}>
          {done ? <DoneIcon /> : "Mark Done"}
        </button>
        <button onClick={deleteNote}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
