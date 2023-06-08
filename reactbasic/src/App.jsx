import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from server
    fetch('http://0.0.0.0:8090/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}
function Payments(){
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch data from server
    fetch('http://0.0.0.0:8090/api/payments')
      .then(response => response.json())
      .then(data => setPayments(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Payments</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment.id}>{payment.cardNumber} - {payment.expirationDate} - {payment.cvv}</li>
        ))}
      </ul>
    </div>
  );
}
function Payment() {
  const [paymentData, setPaymentData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to server
    fetch('http://0.0.0.0:8090/api/payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input type="text" name="cardNumber" onChange={handleInputChange} />
        </label>
        <label>
          Expiration Date:
          <input type="text" name="expirationDate" onChange={handleInputChange} />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" onChange={handleInputChange} />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <div>
      <Products />
      <Payment />
      <Payments />
    </div>
  );
}

export default App;