/* src/components/BookList/BookList.js */
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import CartContext from "../../CartContext"
import { useNavigate } from "react-router-dom"
import "./BookList.css"

function BookList() {
  const [books, setBooks] = useState([])
  const { cart, setCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(() => {
    getBooks()
  }, [])

  function getBooks() {
    axios.get("http://localhost:3005/books/").then((response) => {
      setBooks(response.data)
    })
  }

  function addToCart(book) {
    if (!cart.includes(book)) {
      setCart([...cart, book])
      navigate("/cart")
    }
  }

  return (
    <div className="booklist-container">
      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-sm-4 book-card">
            <div className="panel panel-primary">
              <div className="panel-heading">{book.name}</div>
              <div className="panel-body">
                <img
                  src={book.image_url}
                  className="product-image"
                  alt={book.name}
                />
              </div>
              <div className="panel-footer">Category: {book.category}</div>
              <button className="loan-button" onClick={() => addToCart(book)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList
