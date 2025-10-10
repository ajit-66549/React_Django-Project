import { useState, useEffect } from "react";
import api from "../api.js";
import Note from "../components/Note";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes;
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/") // calls api
      .then((res) => res.data) // get response from the api
      .then((data) => {
        setNotes(data);
        console.log(data);
      }) // set the data in notes state
      .catch((error) => alert(error)); // alerts the error if occurred
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted!");
        else "Failed to delete note";
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else "Failed to make note";
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          value={title}
          required
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content: </label>
        <textarea
          name="content"
          id="content"
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}

export default Home;
