import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../CartContext";
import { LoginContext } from "../../LoginContext"; // Ensure correct import
import "./Nav.css";

function Nav({ setSearchQuery, setCategory }) {
  const { cart } = useContext(CartContext) || { cart: [] }; // ✅ Prevent undefined
  const { login, setLogin } = useContext(LoginContext) || {}; // ✅ Prevent undefined
  const categories = ["Romance", "Action", "Mystery", "Sci-Fi", "Fantasy", "Non-Fiction"];

  function logout() {
    setLogin(null);
    localStorage.removeItem("accessToken"); // ✅ Match token key with Login.js
    localStorage.removeItem("refreshToken"); // ✅ Clear refresh token too
  }

  return (
    <nav className="navbar">
      {/* LEFT SECTION: Logo & Links */}
      <div className="navbar-left">
        <span className="navbar-brand">
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

      {/* RIGHT SECTION: Sign In, Login, Cart */}
      <div className="navbar-right">
        {!login?.username && <Link to="/signup" className="signin-button">Sign In</Link>}
        {login?.username ? (
          <>
            <span className="welcome-text">Welcome, {login.username}</span>
            <button onClick={logout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-button">Login</Link>
        )}
        <Link to="/cart" className="cart-button">🛒 Cart ({cart?.length || 0})</Link>
      </div>
    </nav>
  );
}

export default Nav;
