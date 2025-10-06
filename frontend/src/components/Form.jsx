import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Logging" : "Register";

  const handlesubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
        const res = await api.post(route, { username, password })
        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/")
        } else {
            navigate("/login")
        }
    } catch(error) {
        alert(error)
    } finally {
        setLoading(false)
    }
  };

  return (
    <form onSubmit={handlesubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="form-button">{name}</button>
    </form>
  );
}

export default Form
