// src/App.js
import React, { useEffect, useState } from "react"
import {BrowserRouter as Router,Routes,Route,useNavigate,} from "react-router-dom" // eslint-disable-line no-unused-vars
import CartContext from "./CartContext"
import LoginContext from "./LoginContext"
import BookList from "./components/BookList/BookList"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import Jumbotron from "./components/Jumbotron/Jumbotron"
import Login from "./components/Login/Login"
import Nav from "./components/Nav/Nav"
import { jwtDecode } from "jwt-decode"
import "./App.css"

function App() {
  const [cart, setCart] = useState([])
  const [login, setLogin] = useState(null)
  const navigate = useNavigate() // eslint-disable-line no-unused-vars

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setLogin(jwtDecode(token))
    }
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <LoginContext.Provider value={{ login, setLogin }}>
        <Jumbotron />
        <Nav />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
        <Footer />
      </LoginContext.Provider>
    </CartContext.Provider>
  )
}

export default App
