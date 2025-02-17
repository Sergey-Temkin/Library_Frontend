// src/App.js
import React, { useState, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom" // eslint-disable-line no-unused-vars
import CartContext from "./CartContext"
import AboutUs from "./components/AboutUs/AboutUs"
import BookList from "./components/BookList/BookList"
import Cart from "./components/Cart/Cart"
import Footer from "./components/Footer/Footer"
import Jumbotron from "./components/Jumbotron/Jumbotron"
import Login from "./components/Login/Login"
import Nav from "./components/Nav/Nav"
import SignIn from "./components/SignIn/SignIn"
import AdminDashboard from "./components/Admin/Admin"
import { LoginProvider, LoginContext } from "./LoginContext"

function App() {
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")

  function ProtectedRoute({ children }) {
    const { login } = useContext(LoginContext)
    return login ? children : <Navigate to="/login" />
  }

  function AdminRoute({ children }) {
    const { login } = useContext(LoginContext)

    if (!login) {
      return <Navigate to="/login" />
    }

    if (!login.is_admin) {
      console.log("Access denied! Redirecting non-admin to home...")
      return <Navigate to="/" />
    }

    return children
  }

  return (
    <LoginProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <div className="app-container">
          <Jumbotron />
          <Nav setSearchQuery={setSearchQuery} setCategory={setCategory} />
          <div className="content">
            <Routes>
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/"
                element={
                  <BookList searchQuery={searchQuery} category={category} />
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginRedirect />} />
              <Route path="/signup" element={<SignIn />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartContext.Provider>
    </LoginProvider>
  )
}

// Separate Component for Login Redirect
function LoginRedirect() {
  const { login } = useContext(LoginContext)
  return login ? <Navigate to="/" /> : <Login />
}

export default App
