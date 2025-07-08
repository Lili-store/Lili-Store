// src/pages/ProductDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetails({ products }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>المنتج غير موجود</p>;

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <img src={product.image} alt={product.name} style={{ width: '300px', borderRadius: '10px' }} />
      <h2>{product.name}</h2>
      <p>{product.isOffer ? 'العرض: ' + product.price + ' جنيه' : 'السعر: ' + product.price + ' جنيه'}</p>
      {product.sizes && <p>المقاسات: {product.sizes}</p>}
      {product.material && <p>الخامة: {product.material}</p>}
      <Link to="/">
        <button style={{ marginTop: '20px' }}>العودة للرئيسية</button>
      </Link>
    </div>
  );
}

export default ProductDetails;