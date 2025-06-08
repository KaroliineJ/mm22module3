const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const productRoutes = require("./routes/products");
require("dotenv").config(); // .env failist muutujad
const contactRoutes = require("./routes/contact");



const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));



// API route
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);

// Kontrollime, kas URI olemas
if (!MONGO_URI) {
  console.error("❌ Puudub MONGO_URI .env failis!");
  process.exit(1);
}

// Mongo ühendus
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB ühendatud");
    app.listen(PORT, () => console.log(`✅ Server töötab pordil ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Mongo ühenduse viga:", err);
    process.exit(1);
  });

// 404 fallback
app.use((req, res) => {
  res.status(404).send("❌ Lehte ei leitud");
});
