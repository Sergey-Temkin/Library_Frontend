/* src/components/Footer/Footer.js */
import React from "react"
import "./Footer.css"

function Footer() {
  return (
    <footer className="footer-container">
      <p>Online Store Copyright</p>
      <form className="footer-form">
        Get deals:
        <input
          type="email"
          className="footer-input"
          placeholder="Email Address"
        />
        <button type="button" className="footer-button">
          Sign Up
        </button>
      </form>
    </footer>
  )
}

export default Footer
