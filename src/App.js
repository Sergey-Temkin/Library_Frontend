// src/App.js
import React, { useState, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"// eslint-disable-line no-unused-vars
import CartContext from "./CartContext"
import AboutUs from "./components/AboutUs/AboutUs"
import BookList from "./components/BookList/BookList"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import Jumbotron from "./components/Jumbotron/Jumbotron"
import Login from "./components/Login/Login"
import Nav from "./components/Nav/Nav"
import { LoginProvider, LoginContext } from "./LoginContext"

function App() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <LoginProvider>
        <div className="app-container">
          <Jumbotron />
          <Nav setSearchQuery={setSearchQuery} setCategory={setCategory} />
          <div className="content">
            <Routes>
              <Route path="/" element={<BookList searchQuery={searchQuery} category={category} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<LoginRedirect />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </LoginProvider>
    </CartContext.Provider>
  )
}

// Separate Component for Login Redirect
function LoginRedirect() {
  const { login } = useContext(LoginContext)
  return login ? <Navigate to="/" /> : <Login />
}

export default App
