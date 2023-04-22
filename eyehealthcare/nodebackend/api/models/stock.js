const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  type: String,
  name: String,
  image: String,
  description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
