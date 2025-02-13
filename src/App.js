// src/App.js
import "./App.css"
import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Jumbotron from "./components/Jumbotron"
import Nav from "./components/Nav"
import Cart from "./components/Cart"
import BookList from "./components/BookList"
import CartContext from "./CartContext"
import LoginContext from "./LoginContext"
import Total from "./components/Total"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import { jwtDecode } from "jwt-decode"


function App() {
  const [cart, setCart] = useState([])
  const [login, setLogin] = useState([])
  const navigate = useNavigate() // eslint-disable-line no-unused-vars

  useEffect(() => {
    const token = localStorage.getItem("token")
    token && setLogin(jwtDecode(token))
  }, [])

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <LoginContext.Provider value={{ login, setLogin }}>
          <Jumbotron />
          <Nav />
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/about"
              element={
                <>
                  <h1>This is the about page</h1>
                </>
              }
            />
          </Routes>
          <Total />
          <Footer />
        </LoginContext.Provider>
      </CartContext.Provider>
    </>
  )
}

export default App