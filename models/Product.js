const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nimi: { type: String, required: true },
  hind: { type: Number, required: true },
  kirjeldus: String,
  pilt: String,
  kategooria: String,
});

module.exports = mongoose.model('Product', productSchema);
