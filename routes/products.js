const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Piltide salvestus
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// GET kõik
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Toodete laadimine ebaõnnestus" });
  }
});

// GET üks
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });
    res.json(product);
  } catch {
    res.status(400).json({ error: "Vigane ID" });
  }
});

// POST uus
router.post("/", upload.array("pildid"), async (req, res) => {
  try {
    const imagePaths = req.files.map(f => "/uploads/" + f.filename);
    const body = req.body;

    const product = new Product({
      name: body.name,
      description: body.description,
      price: parseFloat(body.price),
      material: body.material,
      category: body.category,
      images: imagePaths
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Salvestamine ebaõnnestus" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Toodet ei leitud" });
    res.sendStatus(204);
  } catch {
    res.status(400).json({ error: "Kustutamine ebaõnnestus" });
  }
});

module.exports = router;
