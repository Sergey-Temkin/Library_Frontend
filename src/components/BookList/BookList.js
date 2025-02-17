/* src/components/BookList/BookList.js */
import API from "../../api"
import React, { useContext, useEffect, useState } from "react"
import CartContext from "../../CartContext"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../../LoginContext"
import "./BookList.css"

function BookList({ searchQuery, category }) {
  const [books, setBooks] = useState([])
  const { cart, setCart } = useContext(CartContext)
  const { login } = useContext(LoginContext)
  const navigate = useNavigate()

  useEffect(() => {
    getBooks()
  }, [])

  function getBooks() {
    API.get("books/").then((response) => {
      setBooks(response.data)
    })
  }

  useEffect(() => {
    getBooks()
  }, [])

  function addToCart(book) {
    if (!cart.includes(book)) {
      setCart([...cart, book])
      navigate("/cart")
    }
  }

  // **FILTER LOGIC**
  const filteredBooks = books.filter((book) => {
    return (
      (searchQuery === "" || book.name.toLowerCase().includes(searchQuery)) &&
      (category === "" || book.category.toLowerCase() === category)
    )
  })

  return (
    <div className="booklist-container">
      {filteredBooks.map((book, index) => (
        <div key={index} className="book-card">
          <div className="book-content">
            <h3 className="book-title">{book.name}</h3>
            <img
              src={book.image_url ? book.image_url : "/placeholder.png"}
              className="book-image"
              alt={book.name}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.png"
              }}
            />
            <p className="book-category">Category: {book.category}</p>
            <button
              className="loan-button"
              onClick={() => (login ? addToCart(book) : navigate("/login"))}
            >
              {login ? "Loan this book" : "Login to Loan"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookList
