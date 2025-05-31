// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Ühenda MongoDB üks kord
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Ühendus MongoDB-ga edukas"))
  .catch((err) => console.error("❌ MongoDB ühenduse viga:", err));

// Route testimiseks
app.get('/', (req, res) => {
  res.send('Backend server töötab!');
});

// API route'd
app.use('/api/products', productRoutes);

// Server käima
app.listen(port, () => {
  console.log(`🚀 Server töötab pordil ${port}`);
});
