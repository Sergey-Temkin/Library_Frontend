/* src/components/Login/Login.js */
import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginContext from "../../LoginContext"
import { jwtDecode } from "jwt-decode"
import "./Login.css"

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { login, setLogin } = useContext(LoginContext) // eslint-disable-line no-unused-vars
  const navigate = useNavigate()

  function doLogin() {
    const loginData = {
      username: userName,
      password: password,
    }
    axios
      .post("http://127.0.0.1:8000/login/", loginData)
      .then((response) => {
        const token = jwtDecode(response.data.access)
        localStorage.setItem("Token", response.data.access)
        setLogin(token)
        navigate("/")
      })
      .catch(() => {
        setMessage("Login Failed, please try again")
      })
  }

  return (
    <div className="login-container">
      <div className="alert alert-success">{message}</div>
      <label>Username:</label>
      <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={doLogin}>Login</button>
    </div>
  )
}

export default Login
