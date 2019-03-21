const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../config/keys").JWT_KEY;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const User = require("../../models/User");

//Middlewre to check whether the cart that trying to access is vailable for the user

module.exports = (req, res, next) => {
  let myId = req.params.id || req.body._id;
  const em = req.userData.email;
  User.findOne({ email: em }).then(user => {
    let isInArray = false;
    for (let i of user.orders) {
      if (i.cartId == myId) {
        isInArray = true;
      }
    }
    if (isInArray) {
      next();
    } else {
      res.status(403).json({ success: false });
    }
  });
};
