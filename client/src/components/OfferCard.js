import React from 'react';
import './OfferCard.css';

function OfferCard() {
  return (
    <div className="product-card">
      <img src="/images/basic-top.jpg" alt="عرض قطعتين" className="product-image" />
      <h2>🎁 عرض خاص</h2>
      <p>قطعتين بـ <b>350 جنيه</b></p>
      <button className="add-btn">🛒 أضف إلى السلة</button>
    </div>
  );
}

export default OfferCard;