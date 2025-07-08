// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import { CartProvider } from './CartContext';

function App() {
  const products = [
    {
      id: 1,
      name: 'بيزك توب أبيض',
      price: 199,
      image: '/images/basic-white.jpg',
      isOffer: false,
      color: 'أبيض',
      sizeOptions: ['M', 'L'],
      material: 'قطن جيل'
    },
    {
      id: 2,
      name: 'بيزك توب أسود',
      price: 199,
      image: '/images/basic-black.jpg',
      isOffer: false,
      color: 'أسود',
      sizeOptions: ['M', 'L'],
      material: 'قطن جيل'
    },
    {
      id: 3,
      name: 'عرض قطعتين',
      price: 350,
      image: '/images/offer-top.jpg',
      isOffer: true,
      color: 'أبيض + أسود',
      sizeOptions: ['M', 'L'],
      material: 'قطن جيل'
    }
  ];

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="product-list">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetails products={products} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;