import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import API from "../../api"
import { LoginContext } from "../../LoginContext"
import "./Login.css"

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const { setLogin } = useContext(LoginContext)
  const navigate = useNavigate()

  async function doLogin() {
    try {
      const response = await API.post("login/", {
        username: userName,
        password: password,
      })

      const { access, refresh } = response.data
      const decodedToken = jwtDecode(access)

      console.log("✅ Login successful, decoded token:", decodedToken)

      // Store username separately in localStorage
      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
      localStorage.setItem("username", userName) // ✅ Store username separately

      const loginData = {
        ...decodedToken,
        username: userName, // Use stored username
      }

      console.log("✅ Setting login context:", loginData)
      setLogin(loginData)

      setMessage("Login successful! Redirecting...")
      setTimeout(() => navigate("/"), 1500)
    } catch (error) {
      console.error("❌ Login failed:", error)
      setMessage("Login failed! Please try again.")
    }
  }

  return (
    <div className="login-container">
      {message && <div className="alert">{message}</div>}
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
