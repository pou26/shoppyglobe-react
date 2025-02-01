import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/cartSlice";
import "./Cart.css"; 

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <li className="cart-item">
      <img src={item.thumbnail} alt={item.title} className="cart-image" />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="item-price">Price: ${item.price.toFixed(2)}</p>
        <div className="quantity-control">
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
        </div>
        <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </button>
      </div>
      <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
    </li>
  );
}

export default CartItem;
