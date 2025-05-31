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

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
