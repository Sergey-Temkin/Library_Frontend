/* src/components/Cart/Cart.js */
import { useContext } from "react";
import CartContext from "../../CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  // Function to remove a book from the cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart:</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((book, index) => (
            <div key={index} className="cart-item">
              <img
                src={book.image_url}
                alt={book.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{book.name}</h3>
              </div>
              <button
                className="cart-delete-button"
                onClick={() => removeFromCart(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}
      <Link to="/">
        <button className="cart-buttons">Continue shopping</button>
      </Link>
      {cart.length > 0 && (
        <Link to="/">
          <button className="cart-buttons">Make a Loan</button>
        </Link>
      )}
    </div>
  );
}

export default Cart;