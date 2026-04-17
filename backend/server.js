const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🛍️ PRODUCTS DATA
const products = [
  { id: 1, name: "Nike Shoes", price: 1200, discount: 10 },
  { id: 2, name: "Apple Watch", price: 5000, discount: 15 },
  { id: 3, name: "T-Shirt", price: 400, discount: 20 },
  { id: 4, name: "Headphones", price: 1500, discount: 25 },
  { id: 5, name: "Backpack", price: 900, discount: 30 }
];

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🛍️ PRODUCTS API
app.get("/products", (req, res) => {
  res.json(products);
});

// 🚀 START SERVER (FIXED)
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});