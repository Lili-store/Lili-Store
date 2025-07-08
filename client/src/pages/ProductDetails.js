// src/pages/ProductDetails.js
import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './ProductDetails.css';

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const [size, setSize] = useState(product?.sizeOptions?.[0] || 'M');
  const [added, setAdded] = useState(false);

  if (!product) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>المنتج غير موجود</p>;
  }

  const handleAdd = () => {
    addToCart({ ...product, selectedSize: size });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <div className="details-info">
        <h2>{product.name}</h2>
        <p>الخامة: {product.material}</p>
        <p>اللون: {product.color}</p>
        <p>السعر: {product.price} جنيه</p>

        <label>اختيار المقاس:</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          {product.sizeOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button className="add-to-cart-btn" onClick={handleAdd}>
          {added ? '✅ تم الإضافة' : 'أضف إلى السلة'}
        </button>

        <Link to="/" className="back-link">← الرجوع</Link>
      </div>
    </div>
  );
}

export default ProductDetails;