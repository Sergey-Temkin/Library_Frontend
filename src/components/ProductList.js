import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import CartContext from "../CartContext"
import { useNavigate } from "react-router-dom"

function ProductList() {
  const [products, setProducts] = useState([])
  const { cart, setCart } = useContext(CartContext)
  const navigate = useNavigate() // Initialize navigate

  useEffect(() => {
    getProducts()
    console.log("Starting")
  }, [])

  function getProducts() {
    axios.get("http://localhost:3005/products/").then((response) => {
      setProducts(response.data)
    })
  }

  function addToCart(product) {
    const existingProduct = cart.find((cartProduct) => cartProduct === product)
    if (!existingProduct) {
      setCart([...cart, product])
      console.log("Cart is", cart)
      navigate("/cart") //Navigate to cart when pressed "Add to cart" button
    }
  }
  return (
    <>
      <div class="container">
        <div class="row">
          {products.map((product, index) => (
            <div key={index} class="col-sm-4">
              <div class="panel panel-primary">
                <div class="panel-heading">{product.name}</div>
                <div class="panel-body">
                  <img
                    src={product.image}
                    className="product-image img-responsive"
                    style={{ width: "100%" }}
                    alt={product.name}
                  />
                </div>
                <div class="panel-footer">${product.price.toFixed(2)}</div>
                <button
                  className="fetch-button"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      <br />
    </div>  
    </>
  )
}

export default ProductList