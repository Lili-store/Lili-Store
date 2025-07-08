// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <h2>{product.name}</h2>
        <p>{product.isOffer ? 'العرض: 350 جنيه' : `السعر: ${product.price} جنيه`}</p>
      </Link>
    </div>
  );
}

export default ProductCard;