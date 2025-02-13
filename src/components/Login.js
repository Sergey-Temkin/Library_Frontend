import axios from "axios"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginContext from "../LoginContext"
import { jwtDecode } from "jwt-decode"

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { login, setLogin } = useContext(LoginContext) // eslint-disable-line no-unused-vars
  const navigate = useNavigate() // Initialize navigate

  function doLogin() {
    console.log(`login success with username: ${userName} password:${password}`)
    const loginData = {
      username: userName,
      password: password,
    }
    axios
      .post("http://127.0.0.1:8000/login/", loginData)
      .then((response) => {
        console.log(response.data.access)
        const token = jwtDecode(response.data.access)
        localStorage.setItem("token", response.data.access)
        setLogin(token)
        navigate("/")
      })
      .catch((error) => {
        console.log(error)
        setMessage("Login Failed please try again")// error.message
      })
  }
  return (
    <>
      <div class="alert alert-success">{message}</div>
      UserName:
      <input value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br />
      Password:
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={doLogin}>Login</button>
    </>
  )
}

export default Login