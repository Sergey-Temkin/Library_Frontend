/* src/components/Cart/Cart.js */
import { useContext, useState, useEffect, useCallback } from "react"
import CartContext from "../../CartContext"
import { LoginContext } from "../../LoginContext"
import API from "../../api"
import { Link } from "react-router-dom"
import "./Cart.css"

function Cart() {
  const { cart, setCart } = useContext(CartContext)
  const { login } = useContext(LoginContext)
  const [loanType, setLoanType] = useState({})
  const [loans, setLoans] = useState([])
  const [books, setBooks] = useState([])
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await API.get("books/") // Fetch all books
        setBooks(response.data)
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }

    fetchBooks()
  }, [])

  const getBookImage = (bookName) => {
    const foundBook = books.find((b) => b.name === bookName)
    return foundBook ? foundBook.image_url : "/placeholder.png"
  }

  const fetchLoans = useCallback(async () => {
    try {
      const response = await API.get("loans/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setLoans(
        response.data.filter((loan) => loan.user_name === login?.username)
      )
    } catch (error) {
      console.error("Error fetching loans:", error)
    }
  }, [login, token])

  useEffect(() => {
    if (login) {
      fetchLoans()
    }
  }, [login, fetchLoans])

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const handleLoan = async (book) => {
    if (!loanType[book.name]) return
    try {
      await API.post(
        `borrow_book/${book.id}/`,
        { type: loanType[book.name] },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(cart.filter((item) => item !== book))
      fetchLoans()
    } catch (error) {
      console.error("Error loaning book:", error)
    }
  }

  const handleReturn = async (loanId) => {
    try {
      await API.post(
        `return_book/${loanId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      fetchLoans()
    } catch (error) {
      console.error("Error returning book:", error)
    }
  }

  return (
    <div className="cart-container">
      {/* Cart */}
      <h1 className="cart-title">Cart:</h1>
      {cart.length > 0 ? (
        cart.map((book, index) => (
          <div key={index} className="cart-item">
            <img
              src={book.image_url}
              alt={book.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{book.name}</h3>
              {/* Loan dropdown selection */}
              <select
                className="loan-dropdown dark-mode"
                onChange={(e) =>
                  setLoanType({ ...loanType, [book.name]: e.target.value })
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Loan time:
                </option>
                <option value="1">10 days</option>
                <option value="2">5 days</option>
                <option value="3">2 days</option>
              </select>
            </div>
            {/* Buttons: Delete, Loan */}
            <button
              className="cart-delete-button"
              onClick={() => removeFromCart(index)}
            >
              Delete
            </button>
            {loanType[book.name] && (
              <button
                className="cart-loan-button"
                onClick={() => handleLoan(book)}
              >
                Loan
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}
      <br></br>
      {/* My Loans */}
      <h1 className="cart-title">My Loans:</h1>
      {loans.length > 0 ? (
        loans.map((loan) => (
          <div key={loan.id} className="cart-item">
            <img
              src={getBookImage(loan.book_name)}
              alt={loan.book_name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{loan.book_name}</h3>
              <p>Return by: {loan.return_date}</p>
            </div>
            {loan.returned ? (
              <p className="returned-text">Returned</p>
            ) : (
              <button
                className="return-button"
                onClick={() => handleReturn(loan.id)}
              >
                Return Book
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="cart-empty">No active loans</p>
      )}

      {/* Continue shopping */}
      <Link to="/">
        <button className="cart-buttons">Continue shopping</button>
      </Link>
    </div>
  )
}

export default Cart
