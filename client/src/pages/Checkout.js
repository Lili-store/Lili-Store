import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './Checkout.css';

function Checkout({ products }) {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('الدفع عند الاستلام');
  const [size, setSize] = useState('M');

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      name,
      phone,
      address,
      size,
      paymentMethod,
      items: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
      total: totalAmount
    };

    try {
      await fetch('https://formspree.io/f/xzzglawy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      navigate('/confirmation');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>إتمام الطلب</h2>

      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="العنوان"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>

          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="الدفع عند الاستلام"
                checked={paymentMethod === 'الدفع عند الاستلام'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              الدفع عند الاستلام
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="فودافون كاش"
                checked={paymentMethod === 'فودافون كاش'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              فودافون كاش
            </label>
          </div>

          <h3>الملخص:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} = {item.price * item.quantity} جنيه
              </li>
            ))}
          </ul>

          <h3>الإجمالي: {totalAmount} جنيه</h3>

          <button type="submit">إتمام الطلب</button>
        </form>
      )}
    </div>
  );
}

export default Checkout;