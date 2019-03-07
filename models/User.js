const mongoose = require("mongoose");
const Cart = require("./Cart");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  cartSet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Cart
    }
  ],
  orders: [
    {
      cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Cart
      },
      table: {
        type: Number,
        default: 1
      },
      totalAmount: {
        type: Number,
        default: 0
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
