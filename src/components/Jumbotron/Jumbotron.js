/* src/components/Jumbotron/Jumbotron.js */
import React from "react"
import "./Jumbotron.css"

function Jumbotron() {
  return (
    <div
      className="jumbotron-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${
          process.env.PUBLIC_URL + "/Stars.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="jumbotron-content">
        <h1>Welcome to Our Online Library</h1>
        <p>Explore a vast collection of books at your fingertips.</p>
      </div>
    </div>
  )
}

export default Jumbotron
