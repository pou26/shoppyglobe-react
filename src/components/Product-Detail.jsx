import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart , increaseQuantity, decreaseQuantity } from "../redux/cartSlice"; 
import React, { useEffect, useRef, useState } from "react";
import "./ProductDetails.css";

function ProductDetail() {
    const { id } = useParams();
    const numericId = Number(id); 
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Find product in Redux store instead of fetching again
  const product = products.find((p) => p.id === Number(id));

  if (loading) return <h2>Loading product details...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!product) return <h2>Product not found</h2>;
  
  // Get product quantity from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  const cartItem = cartItems.find((item) => item.id === numericId);
  const quantity = cartItem ? cartItem.quantity : 0;
  

  return (
    <>
      <h1 className="product-details-heading">Product Details</h1>
      <div className="product-details-container">
        {/* Left Section - Product Image */}
        <div className="product-image-section">
          <Link to="/" className="back-button">
            <p>← Back to Products</p>
          </Link>
          <div className="product-image-wrapper">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
          </div>
        </div>

        {/* Right Section - Product Info */}
        <div className="product-info-section">
          <h2 className="product-info-title">{product.title}</h2>
          <h3><span>Brand:</span> {product.brand}</h3>
          <h3><span>Description:</span> {product.description}</h3>
          <h3><span>Price:</span> ${product.price}</h3>
          <div className="product-rating">⭐ {product.rating} / 5</div>

          {/* Toggle between "Add to Cart" and Quantity Buttons */}
          {quantity > 0 ? (
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => dispatch(decreaseQuantity(numericId))}>-</button>
              <span className="quantity-text">{quantity}</span>
              <button className="quantity-btn" onClick={() => dispatch(increaseQuantity(numericId))}>+</button>

            </div>
          ) : (
            <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
