import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);

    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;