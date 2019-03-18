const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: "samarey"
  },
  price: {
    type: Number,
    default: 0
  },
  available: {
    type: Number,
    default: 100
  },
  image: {
    type: String,
    default: "https://picsum.photos/120/80"
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
