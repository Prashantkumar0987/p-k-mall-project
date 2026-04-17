import { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔐 Auth
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // 💳 Payment animation
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // 🔄 Fetch products
  useEffect(() => {
    fetch("https://p-k-mall-project-1.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // 🟢 Signup
  const handleSignup = () => {
    if (!name) return alert("Enter name");

    if (users.includes(name)) {
      alert("User already exists, please login");
      return;
    }

    const newUsers = [...users, name];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUser(name);
  };

  // 🔵 Login
  const handleLogin = () => {
    if (users.includes(name)) {
      setUser(name);
    } else {
      alert("User not found, please signup");
    }
  };

  // 🛒 Cart
  const addToCart = (item) => setCart([...cart, item]);

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // 🔍 Filter
  const filteredProducts = products.filter((item) => {
    const budgetValue = Number(budget);

    return (
      (search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase())) &&
      (budget === "" ||
        (!isNaN(budgetValue) && item.price <= budgetValue))
    );
  });

  // 💳 Payment
  const handlePayment = () => {
    setPaymentSuccess(true);

    setTimeout(() => {
      setPaymentSuccess(false);
      setCart([]);
    }, 4000);
  };

  // 🔐 AUTH UI
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <img src={logo} className="auth-logo" alt="logo" />
          <h1 className="brand">P&K Mall</h1>
          <p className="tagline">Your Smart Shopping Partner 🛍️</p>

          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />

          {isSignup ? (
            <button className="primary-btn" onClick={handleSignup}>
              Create Account
            </button>
          ) : (
            <button className="primary-btn" onClick={handleLogin}>
              Login
            </button>
          )}

          <p className="switch-text" onClick={() => setIsSignup(!isSignup)}>
            {isSignup
              ? "Already have an account? Login"
              : "New here? Create account"}
          </p>
        </div>
      </div>
    );
  }

  // 🛍️ MAIN APP
  return (
    <div>
      {/* 🔝 NAVBAR */}
      <div className="navbar">
        <img src={logo} className="nav-logo" alt="logo" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="nav-search"
        />

        <input
          type="number"
          placeholder="Budget ₹"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="nav-search"
        />

        {/* 👤 PROFILE */}
        <div className="nav-profile">
          <div className="avatar">
            {user.charAt(0).toUpperCase()}
          </div>
          <span className="username">{user}</span>
        </div>
      </div>

      {/* 🛍️ PRODUCTS */}
      <h2 className="section-title">Products</h2>

      {loading ? (
        <p style={{ color: "white" }}>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p style={{ color: "white" }}>No products found</p>
          ) : (
            filteredProducts.map((item) => (
              <div className="product-card" key={item.id}>
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <p className="discount">{item.discount}% OFF</p>
                <button onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* 🛒 CART */}
      <div className="cart-box">
        <h2>🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>
                {item.name} - ₹{item.price}
              </span>
              <button onClick={() => removeFromCart(index)}>❌</button>
            </div>
          ))
        )}

        <h3>Total: ₹{total}</h3>

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={cart.length === 0}
        >
          Proceed to Pay 💳
        </button>
      </div>

      {/* 🎉 SUCCESS ANIMATION */}
      {paymentSuccess && (
        <div className="payment-success">

          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="firework"
              style={{
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() + "s"
              }}
            />
          ))}

          {[...Array(40)].map((_, i) => (
            <div
              key={"c" + i}
              className="confetti"
              style={{
                left: Math.random() * 100 + "%",
                animationDuration: 2 + Math.random() * 3 + "s"
              }}
            />
          ))}

          <div className="success-box">
            <div className="success-icon">✔</div>
            <h2 className="success-text">Payment Successful</h2>
            <p className="success-sub">Your order is confirmed 🎉</p>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
