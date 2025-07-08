import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './Checkout.css';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'الدفع عند الاستلام',
  });

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      payment: formData.payment,
      order: cartItems.map((item) => `${item.name} - ${item.quantity} × ${item.price} جنيه`).join('\n'),
      total: ${totalAmount} جنيه,
    };

    try {
      await fetch('https://formspree.io/f/xzzglawy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formPayload),
      });

      clearCart();
      navigate('/confirmation');
    } catch (error) {
      console.error('فشل في إرسال الطلب:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>إتمام الطلب</h2>

      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} × {item.price} جنيه
          </li>
        ))}
      </ul>

      <h3>الإجمالي: {totalAmount} جنيه</h3>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="الاسم"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="العنوان"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <select name="payment" value={formData.payment} onChange={handleChange}>
          <option value="الدفع عند الاستلام">الدفع عند الاستلام</option>
          <option value="فودافون كاش">فودافون كاش</option>
        </select>

        <button type="submit">إرسال الطلب</button>
      </form>
    </div>
  );
}

export default Checkout;