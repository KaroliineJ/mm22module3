const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Kõik tooted
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Üks toode nime alusel
router.get('/:name', async (req, res) => {
  const product = await Product.findOne({ name: req.params.name });
  res.json(product);
});

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const product = await Product.findOne({ nimi: name });
      if (!product) return res.status(404).json({ error: "Toode puudub" });
      return res.json(product);
    }

    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
