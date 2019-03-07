const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../config/keys").JWT_KEY;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const User = require("../../models/User");

module.exports = (req, res, next) => {
  let myId = req.params.id || req.body._id;
  const em = req.userData.email;
  User.findOne({ email: em }).then(user => {
    let a = false;
    for (let i of user.orders) {
      if (i.cartId == myId) {
        a = true;
      }
    }
    if (a) {
      next();
    } else {
      res.status(403).json({ success: false });
    }
  });
};
