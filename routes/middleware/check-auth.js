const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../config/keys").JWT_KEY;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Middleware to check whether the token is valid

module.exports = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false });
  }
};
