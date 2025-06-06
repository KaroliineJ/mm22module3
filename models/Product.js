const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  images: [String],
  sizes: [String], // ainult kui tootel on suurused
});

module.exports = mongoose.model('Product', productSchema);
