const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./Item");

//Create Schema
const CartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  items: [
    {
      itm: {
        type: Schema.Types.ObjectId,
        ref: Item
      },
      count: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model("Cart", CartSchema);
