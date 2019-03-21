const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CART Model

const Cart = require("../../models/Cart");

const CartController = require("../controllers/carts");
const checkAuth = require("../middleware/check-auth");
const checkUser = require("../middleware/check-user");

//@route GET api/carts/:id
//@desc get a given CART
//@access public
router.get("/:id", checkAuth, checkUser, CartController.cart_get);

//@route POST api/carts
//@desc add an ITEM to a given CART
//@access public
router.post("/", checkAuth, checkUser, CartController.cart_addItem);

//@route PUT api/carts/:id/:itId/:count
//@desc change count of a ITEM in a given CART
//@access public
router.put(
  "/:id/:itemId/:count",
  checkAuth,
  checkUser,
  CartController.cart_changeTotal
);

//@route DELETE api/carts/:id/:itId
//@desc delete an ITEM in a given CART
//@access public
router.delete(
  "/:id/:itemId",
  checkAuth,
  checkUser,
  CartController.cart_removeItem
);

//@route DELETE api/carts/:id
//@desc delete all the ITEMs in a given CART
//@access public
router.delete("/:id", checkAuth, checkUser, CartController.cart_clear);

module.exports = router;
