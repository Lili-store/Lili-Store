import React, { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import './Checkout.css';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'الدفع عند الاستلام',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('الاسم', formData.name);
    formDataToSend.append('رقم الهاتف', formData.phone);
    formDataToSend.append('العنوان', formData.address);
    formDataToSend.append('طريقة الدفع', formData.paymentMethod);

    const total = cartItems.reduce(function(acc, item) {
      return acc + item.price * item.quantity;
    }, 0);

    formDataToSend.append('الإجمالي', total + ' جنيه');

    formDataToSend.append('تفاصيل الطلب', cartItems.map(function(item){
      return item.name + ' - مقاس ' + (item.size || 'غير محدد') + ' × ' + item.quantity;
    }).join(', '));

    try {
      const response = await fetch('https://formspree.io/f/xzzglawy', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        setSuccess(true);
        clearCart();
      } else {
        alert('حدث خطأ أثناء إرسال الطلب.');
      }
    } catch (error) {
      alert('تعذر الاتصال بالخادم.');
    }
  };

  return (
    <div className="checkout-container">
      {success ? (
        <div>
          <h2>✅ تم إرسال الطلب بنجاح!</h2>
          <p>شكرًا لتسوقك من Lili Store ❤️</p>
        </div>
      ) : (
        <>
          <h2>اتمام الطلب</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
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
              placeholder="العنوان بالتفصيل"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="paymentMethod">طريقة الدفع:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="الدفع عند الاستلام">الدفع عند الاستلام</option>
              <option value="فودافون كاش">فودافون كاش</option>
            </select>

            <button type="submit">اتمام الطلب</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;