/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";

function Note({ id, title: initialTitle, content: initialContent, done, onUpdate }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isEdited, setIsEdited] = useState(false);


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
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: isEdited ? title : initialTitle,
          content: isEdited ? content : initialContent,
          done: !done
        })
      });
      const responseData = await response.json();
      console.log(responseData);
      onUpdate(); // Call the onUpdate function to reflect the change immediately
    } catch (error) {
      console.error("Error toggling done status:", error);
    }
  };

  const handleEdit = () => {
    setIsEdited(true);
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          done
        })
      });
      setIsEdited(false);
      onUpdate(); // Call the onUpdate function to reflect the change immediately
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };



  if (isDeleted) {
    return null; // Don't render the note if it is deleted
  }

  return (
    <div className={`note ${done ? "done" : ""}`}>
      {isEdited ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleSave}><DoneIcon /></button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <div>
            <button onClick={toggleDone}>
              {done ? <DoneIcon /> : "Mark Done"}
            </button>
            <button onClick={handleEdit}>
              <EditIcon />
            </button>
            <button onClick={deleteNote}>
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
