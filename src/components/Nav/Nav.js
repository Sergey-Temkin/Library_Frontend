/* src/components/Nav/Nav.js */
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import CartContext from "../../CartContext"
import LoginContext from "../../LoginContext"
import "./Nav.css"

function Nav() {
  const { cart } = useContext(CartContext)
  const { login, setLogin } = useContext(LoginContext)

  function logout() {
    setLogin(null)
    localStorage.removeItem("token")
  }

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-left">
          <span className="navbar-brand">
            <span className="logo">📚</span> Library
          </span>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            {login ? (
              <>
                <span>Welcome, {login.username}</span>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Link to="/cart">🛒 Cart ({cart.length})</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
