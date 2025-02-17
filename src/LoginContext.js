// src/LoginContext.js
import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const LoginContext = createContext(null)

export function LoginProvider({ children }) {
  const [login, setLogin] = useState(null)

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken)
        console.log("Auto-login detected:", decoded)

        const loginData = {
          username: localStorage.getItem("username"),
          is_admin: decoded.is_admin, // Store is_admin
        }

        setLogin(loginData)
      } catch (err) {
        console.error("Invalid token, logging out...")
        handleLogout()
      }
    }
  }, [])

  function handleLogout() {
    console.log("Logging out...")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("username") // Remove stored username
    setLogin(null)
  }

  return (
    <LoginContext.Provider value={{ login, setLogin, handleLogout }}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContext }
export default LoginProvider
