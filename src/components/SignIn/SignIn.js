/* src/components/SignIn/SignIn.js */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../api" // Import centralized Axios instance
import "./SignIn.css"

function SignIn() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  async function handleSignUp() {
    try {
      await API.post("register/", {
        username: username,
        email: email,
        password: password,
      })

      setMessage("User registered successfully! Redirecting to login...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (error) {
      setMessage("Registration failed! Please try again.")
    }
  }

  return (
    <div className="signin-container">
      {message && <div className="alert">{message}</div>}
      <h2>Sign Up</h2>
      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}

export default SignIn
