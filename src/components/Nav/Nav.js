/* src/components/Nav/Nav.js */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../CartContext";
import LoginContext from "../../LoginContext";
import "./Nav.css";

function Nav() {
  const { cart } = useContext(CartContext);
  const { login, setLogin } = useContext(LoginContext);
  const [searchQuery, setSearchQuery] = useState("");

  function logout() {
    setLogin(null);
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">
          <span className="logo">📚</span> Library
        </span>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        <div className="navbar-links">
          {!login && <Link to="/signup" className="signin-button">Sign In</Link>}
          {login ? (
            <>
              <span className="welcome-text">Welcome, {login.username}</span>
              <button onClick={logout} className="logout-button">Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
          <Link to="/cart" className="cart-button">🛒 Cart ({cart.length})</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
