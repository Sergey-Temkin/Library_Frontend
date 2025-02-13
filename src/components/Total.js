import React, { useContext } from "react"
import CartContext from "../CartContext"

function Total() {
  const { cart, setCart } = useContext(CartContext) // eslint-disable-line no-unused-vars

  return (
    <div>
      Total:{cart.length}
      <br />
      Total Sum: {cart.reduce((acc, product) => acc + product.price, 0)}
    </div>
  )
}

export default Total