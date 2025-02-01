import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter } from "../redux/productSlice";
import "./Header.css";
import "../App.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/"><img src="shopping-bag.png" alt="logo" /></Link>
      </div>

      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
        <img src="menu.png" alt="menu" height="25px" />
      </div>

      <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>✖</div>
        <ul className="navitems">
            <li><Link className="list-nav" to="/">Home</Link></li>
            <li className="list-nav" onClick={() => handleCategoryClick("all")}>All Products</li>
            <li className="list-nav" onClick={() => handleCategoryClick("fragrances")}>Perfumes</li>
            <li className="list-nav" onClick={() => handleCategoryClick("beauty")}>Makeup</li>
            <li className="list-nav" onClick={() => handleCategoryClick("furniture")}>Furniture</li>
            <li className="list-nav" onClick={() => handleCategoryClick("groceries")}>Groceries</li>
        </ul>
      </nav>

      <div className="cart">
        <Link to="/cart" className="cart-link">
          <img src="cart.png" alt="cart" height="40px" />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
