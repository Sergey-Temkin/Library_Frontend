import { useContext } from "react"
import CartContext from "../CartContext"
import Total from "./Total"
import { Link } from "react-router-dom"

function Cart() {
  const { cart, setCart } = useContext(CartContext) // eslint-disable-line no-unused-vars
  
  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart:</h1>
      {cart.length > 0 ? (
        cart.map((product, index) => (
          <div key={index} className="cart-item">
            <img
              src={product.image}
              alt={product.name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{product.name}</h3>
              <p className="cart-item-price">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}
      
      <Total />
      <Link to="/">
        <button className="btn btn-success">Continue shopping</button>
      </Link>
    </div>
  )
}

export default Cart