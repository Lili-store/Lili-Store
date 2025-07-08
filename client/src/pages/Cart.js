// src/pages/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // نحول السعر لرقم للتأكد من الحساب
  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0; // لو مش رقم يرجع 0
    return acc + (price * item.quantity);
  }, 0);

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>🛒 السلة</h2>
      {cartItems.length === 0 ? (
        <p>السلة فارغة حالياً.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <h3>{item.name}</h3>
              <p>الكمية: {item.quantity}</p>
              <p>السعر: {item.price} جنيه</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>🗑️ حذف</button>
              </div>
            </div>
          ))}

          <h3>الإجمالي: {total} جنيه</h3>

          <button onClick={() => navigate('/checkout')}>إتمام الطلب</button>
        </div>
      )}
      <Link to="/" style={{ display: 'block', marginTop: '20px' }}>⬅ العودة للتسوق</Link>
    </div>
  );
}

export default Cart;