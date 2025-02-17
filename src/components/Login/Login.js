/* src/components/Login/Login.js */
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

  async function doLogin(event) {
    event.preventDefault() // Prevents default form submission behavior

    try {
      const response = await API.post("login/", {
        username: userName,
        password: password,
      })

      const { access, refresh } = response.data
      const decodedToken = jwtDecode(access)

      console.log("Login successful, decoded token:", decodedToken)

      localStorage.setItem("accessToken", access)
      localStorage.setItem("refreshToken", refresh)
      localStorage.setItem("username", userName)

      const loginData = {
        ...decodedToken,
        username: userName,
      }

      console.log("Setting login context:", loginData)
      setLogin(loginData)

      setMessage("Login successful! Redirecting...")

      setTimeout(() => {
        console.log(
          "Redirecting user to:",
          decodedToken.is_admin ? "/admin" : "/"
        )
        navigate(decodedToken.is_admin ? "/admin" : "/", { replace: true })
      }, 1000)
    } catch (error) {
      console.error("Login failed:", error)
      setMessage("Login failed! Please try again.")
    }
  }

  return (
    <div className="login-container">
      {message && <div className="alert">{message}</div>}
      <form onSubmit={doLogin}>
        <label>Username:</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
