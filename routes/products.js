const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Lisa uus toode
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Hangi kõik tooted
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Uuenda toode id järgi
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Toode ei leitud' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Kustuta toode id järgi
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Toode kustutatud' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nimi: { type: String, required: true },
  kirjeldus: String,
  pildid: [String],
  suurused: [String],
  varvid: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

module.exports = router;
