import React, { useState } from "react";
import "../../App.css";
import "./Products.css";

const productData = [
  { 
    id: 1,
    name: "NVIDIA Jetson Xavier NX", 
    description: "High-performance AI edge computing module", 
    img: "/jetson.jpg",
    price: 59999,
  },
  { 
    id: 2,
    name: "IMX415 Camera", 
    description: "High-resolution camera module for embedded projects", 
    img: "/imx415.jpg",
    price: 9999,
  },
  { 
    id: 3,
    name: "PLC Controller", 
    description: "Industrial automation PLC controller", 
    img: "/plc.jpg",
    price: 14999,
  },
  { 
    id: 4,
    name: "Embedded Board", 
    description: "Custom embedded boards for IoT projects", 
    img: "/embedded.jpg",
    price: 7999,
  },
  { 
    id: 5,
    name: "Web App", 
    description: "Responsive web applications", 
    img: "/webdev.jpg",
    price: 4999,
  },
  { 
    id: 6,
    name: "Mobile App", 
    description: "Android and iOS mobile applications", 
    img: "/appdev.jpg",
    price: 6999,
  },
];

function Products() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleBuy = async (product) => {
    try {
      // Call backend to create Razorpay order
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.price }),
      });
      const order = await res.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: "MRAD Enterprises",
        description: product.name,
        order_id: order.id,
        handler: function (response) {
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // Optionally, clear cart or mark item as purchased
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <section className="products-section">
      <h2 className="products-title">Our Products</h2>

      {/* Products Grid */}
      <div className="products-grid">
        {productData.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
            <button className="cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="cart-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="buy-btn"
                      onClick={() => handleBuy(item)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Products;
