// src/components/BookList.js
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import CartContext from "../CartContext"
import { useNavigate } from "react-router-dom"

function BookList() {
  const [books, setBooks] = useState([])
  const { cart, setCart } = useContext(CartContext)
  const navigate = useNavigate() // Initialize navigate

  useEffect(() => {
    getBooks()
    console.log("Starting")
  }, [])

  function getBooks() {
    axios.get("http://localhost:3005/books/").then((response) => {
      setBooks(response.data)
    })
  }

  function addToCart(book) {
    const existingBook = cart.find((cartBook) => cartBook === book)
    if (!existingBook) {
      setCart([...cart, book])
      console.log("Cart is", cart)
      navigate("/cart") //Navigate to cart when pressed "Add to cart" button
    }
  }
  return (
    <>
      <div class="container">
        <div class="row">
          {books.map((book, index) => (
            <div key={index} class="col-sm-4">
              <div class="panel panel-primary">
                <div class="panel-heading">{book.name}</div>
                <div class="panel-body">
                  <img
                    src={book.image_url}
                    className="product-image img-responsive"
                    style={{ width: "100%" }}
                    alt={book.name}
                  />
                </div>
                <div class="panel-footer">Category:{book.category}</div>
                <div className="button-container">
                  <button
                    className="fetch-button"
                    onClick={() => addToCart(book)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>
    </>
  )
}

export default BookList
