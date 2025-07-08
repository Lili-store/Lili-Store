// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Lili Store" className="logo" />
        <h2>Lili Store</h2>
      </div>
      <div>
        <Link to="/">الرئيسية</Link>
        <Link to="/cart" className="cart-link">🛒 السلة</Link>
        <Link to="/checkout">✔️ الطلب</Link>
      </div>
    </nav>
  );
}

export default Navbar;