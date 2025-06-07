const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nimi: String,
  kirjeldus: String,
  hind: Number,
  pildid: [String],
  kategooria: String,
  suurused: [String],
  varvid: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
