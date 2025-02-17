/* src/components/Nav/Nav.js */
import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import CartContext from "../../CartContext"
import { LoginContext } from "../../LoginContext"
import "./Nav.css"

function Nav({ setSearchQuery, setCategory }) {
  const { cart } = useContext(CartContext) || { cart: [] }
  const { login, handleLogout } = useContext(LoginContext) || {}
  const categories = [
    "Romance",
    "Action",
    "Mystery",
    "Sci-Fi",
    "Fantasy",
    "Non-Fiction",
  ]

  useEffect(() => {
    console.log("🔄 Navbar re-rendered, login state:", login)
  }, [login])

  return (
    <nav className="navbar">
      {/* LEFT SECTION: Logo & Links */}
      <div className="navbar-left">
        <span className="library-logo">
          <span className="logo">📚</span> Library
        </span>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>

      {/* CENTER SECTION: Search Bar */}
      <div className="navbar-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        <div className="dropdown">
          <button className="dropbtn">Select Category</button>
          <div className="dropdown-content">
            {categories.map((cat) => (
              <span key={cat} onClick={() => setCategory(cat.toLowerCase())}>
                {cat}
              </span>
            ))}
            <span onClick={() => setCategory("")}>All Categories</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Login / Logout */}
      <div className="navbar-right">
        {!login?.username ? (
          <>
            <Link to="/signup" className="signin-button">
              Sign In
            </Link>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </>
        ) : (
          <>
            <span className="welcome-text">Welcome: {login.username}</span>

            {/* ADMIN DASHBOARD BUTTON */}
            {login?.is_admin && (
              <Link to="/admin" className="admin-button">
                🛠 Admin
              </Link>
            )}

            <span className="navbar-link logout-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        )}

        {login?.username && (
          <Link to="/cart" className="cart-button">
            🛒 Cart ({cart?.length || 0})
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Nav
