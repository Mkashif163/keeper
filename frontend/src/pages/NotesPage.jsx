// App.jsx
import { useEffect, useState } from "react";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";

function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  function handleNoteAction() {
    fetchNotes();
  }

  return (
    <div>
      <CreateArea onAdd={handleNoteAction} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.description}
          done={noteItem.done}
          onUpdate={handleNoteAction} // Pass the handleNoteAction function to Note component
        />
      ))}
    </div>
  );
}

export default NotesPage;
