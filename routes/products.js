const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET kõik tooted
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Toodete laadimine ebaõnnestus" });
  }
});

// GET üks toode
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Vigane ID" });
  }
});

// POST uus toode
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Salvestamine ebaõnnestus" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Toodet ei leitud" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Uuendamine ebaõnnestus" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Toodet ei leitud" });
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: "Kustutamine ebaõnnestus" });
  }
});

module.exports = router;
