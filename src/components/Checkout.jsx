import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cartItems } = useSelector((state) => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = totalPrice > 0 ? 5.00 : 0;
  const finalTotal = totalPrice + shippingCost;

  const handlePlaceOrder = () => {
    // order placement
    setOrderPlaced(true);

    //  Automatically redirect after 3 seconds
    setTimeout(() => navigate("/"), 3000);
  };

  if (orderPlaced) {
    return (
      <div className="order-success-container">
        <div className="order-success-message">
          <img src="success.gif" alt="Success" className="success-icon" />
          <h2>Order Successful</h2>
          <p>Thank you so much for your order.</p>
          <button onClick={() => navigate("/")} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-content">
        {/* Left Section: Shipping Form */}
        <div className="checkout-form">
          <h3>Contact Information</h3>
          <input type="email" placeholder="Email" className="checkout-input" />

          <h3>Shipping Address</h3>
          <input type="text" placeholder="First Name" className="checkout-input" />
          <input type="text" placeholder="Last Name" className="checkout-input" />
          <input type="text" placeholder="Address" className="checkout-input" />
          <input type="text" placeholder="City" className="checkout-input" />
          <input type="text" placeholder="ZIP Code" className="checkout-input" />

          <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
        </div>

        {/* Right Section: Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul className="order-items">
            {cartItems.map((item) => (
              <li key={item.id} className="order-item">
                <img src={item.thumbnail} alt={item.title} className="order-image" />
                <div className="order-item-details">
                  <h4>{item.title}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <p>Subtotal: ${totalPrice.toFixed(2)}</p>
          <p>Shipping: ${shippingCost.toFixed(2)}</p>
          <h4 className="total-price">Total: ${finalTotal.toFixed(2)}</h4>
          <Link to="/cart" className="edit-cart-btn">Edit Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
