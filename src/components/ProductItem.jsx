import React, { useEffect, useRef, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import "./Product.css";

const ProductItem = ({ productDetail }) => {
  if (!productDetail) return <p>Invalid product data</p>;

  const dispatch = useDispatch();
  const { id, title, brand, category, price, thumbnail } = productDetail;
  const productRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (productRef.current) observer.observe(productRef.current);

    return () => {
      if (productRef.current) observer.unobserve(productRef.current);
    };
  }, []);

  return (
    <div className={`product-card ${isVisible ? "fade-in" : ""}`} ref={productRef}>
      <div className="product-top">
        <img src={thumbnail} alt={title} className="product-image" />
      </div>
      <div className="product-bottom">
        <h2 className="product-title">{title}</h2>
        <p className="product-brand"><strong>Brand:</strong> {brand}</p>
        <h3 className="product-category"><strong>Category:</strong> {category}</h3>
        <p className="product-price"><strong>Price:</strong> ${price}</p>

        <div className="product-actions">
          <Link to={`/product/${id}`}>
            <button className="view-details-btn">View Details</button>
          </Link>

          {quantity > 0 ? (
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={() => dispatch(decreaseQuantity(id))}>-</button>
              <span className="quantity-text">{quantity}</span>
              <button className="quantity-btn" onClick={() => dispatch(increaseQuantity(id))}>+</button>
            </div>
          ) : (
            <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(productDetail))}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
