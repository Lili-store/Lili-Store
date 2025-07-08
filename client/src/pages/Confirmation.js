// src/pages/Confirmation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  return (
    <div className="confirmation-container">
      <h2>🎉 تم استلام طلبك بنجاح!</h2>
      <p>شكرًا لاختيارك Lili Store 💖</p>
      <p>سنتواصل معك قريبًا لتأكيد التفاصيل.</p>
      <Link to="/" className="back-home">العودة إلى الصفحة الرئيسية</Link>
    </div>
  );
}

export default Confirmation;