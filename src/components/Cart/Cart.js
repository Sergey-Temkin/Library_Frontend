/* src/components/Cart/Cart.js */
import { useContext } from "react"
import CartContext from "../../CartContext"
import { Link } from "react-router-dom"
import "./Cart.css"

function Cart() {
  const { cart, setCart } = useContext(CartContext) // eslint-disable-line no-unused-vars

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart:</h1>
      {cart.length > 0 ? (
        cart.map((book, index) => (
          <div key={index} className="cart-item">
            <img src={book.image} alt={book.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{book.name}</h3>
              <p className="cart-item-price">${book.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}

      <Link to="/">
        <button className="btn btn-success">Continue shopping</button>
      </Link>
    </div>
  )
}

export default Cart
