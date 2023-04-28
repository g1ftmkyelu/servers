const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  type: String,
  name: String,
  Price:Number,
  image: String,
  description: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
