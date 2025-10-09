import { useState, useEffect } from "react";
import api from "../api.js";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes;
  }, [])

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

  return <div>Home</div>;
}

export default Home;
