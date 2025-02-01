import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom"; 
import CartItem from "./CartItem"; 
import "./Cart.css";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = totalPrice > 0 ? 5.00 : 0;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-content">
        {/* Cart Items Section */}
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <p className="empty-cart">
              Your cart is empty. <Link to="/">Go shopping</Link>
            </p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
            </>
          )}
        </div>

        {/* Order Summary Section */}
        {cartItems.length > 0 && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Items: {cartItems.length}</p>
            <p>Subtotal: ${totalPrice.toFixed(2)}</p>
            <p>Shipping: ${shippingCost.toFixed(2)}</p>
            <p className="total-cost">Total Cost: ${finalTotal.toFixed(2)}</p>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
