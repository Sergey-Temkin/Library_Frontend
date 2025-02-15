import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../../api";  // ✅ Import centralized Axios instance
import { LoginContext } from "../../LoginContext";  // ✅ Ensure correct import
import "./Login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Prevent undefined errors
  const loginContext = useContext(LoginContext) || {};
  const { setLogin } = loginContext;

  const navigate = useNavigate();

  async function doLogin() {
    try {
      const response = await API.post("login/", {
        username: userName,
        password: password,
      });

      const { access, refresh } = response.data;
      const decodedToken = jwtDecode(access);

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      if (setLogin) {
        setLogin(decodedToken);
      }

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("Login failed! Please try again.");
    }
  }

  return (
    <div className="login-container">
      {message && <div className="alert">{message}</div>}
      <label>Username:</label>
      <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={doLogin}>Login</button>
    </div>
  );
}

export default Login;
