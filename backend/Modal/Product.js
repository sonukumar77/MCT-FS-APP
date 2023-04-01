const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    count: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("Product", productSchema, "products");
