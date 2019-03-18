const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../../models/User");
const Cart = require("../../models/Cart");

//USER Model

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");
const checkUser = require("../middleware/check-user");

//@route POST api/user/signup
//@desc create a USER
//@access public
router.post("/signup", UserController.user_signup);

//@route POST api/user/login
//@desc login to USER
//@access public
router.post("/login", UserController.user_login);

//@route POST api/user/checkAuth
//@desc check whether USER is authenticated
//@access public
router.post("/checkAuth", checkAuth, (req, res) => {
  res.status(200).json({ success: true });
});

//@route POST api/user/checkUser
//@desc check whether given CART in body is owned by USER
//@access public
router.post("/checkUser", checkAuth, checkUser, (req, res) => {
  res.status(200).json({ success: true });
});

//@route POST api/user/signout
//@desc signout USER
//@access public
router.get("/signout", checkAuth, (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ sucess: true });
});

//@route GET api/user/what
//@desc  get the list of CARTs owned by USER
//@access public
router.get("/what", checkAuth, (req, res) => {
  User.findOne({ email: req.userData.email })
    .then(user => res.status(200).json({ info: user.orders }))
    .catch(err => res.status(404).json({ success: false }));
});

//@route PUT api/user/cash/:id/:total
//@desc  save the total of a CART of a USER
//@access public
router.put("/cash/:id/:total", checkAuth, (req, res) => {
  User.updateOne(
    { email: req.userData.email, "orders.cartId": req.params.id },
    { $set: { "orders.$.totalAmount": req.params.total } }
  )
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(404).json({ success: false }));
});

//@route GET api/user/create/:table
//@desc  create a new CART for the USER
//@access public
router.get("/create/:table", checkAuth, (req, res) => {
  User.findOne({ email: req.userData.email }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    } else if (isNaN(req.params.table)) {
      res.status(400).json({ success: false });
    } else {
      const newCart = new Cart({
        _id: new mongoose.Types.ObjectId(),
        items: []
      });
      newCart.save();
      user.cartSet.push(newCart._id);
      user.orders.push({
        cartId: newCart._id,
        table: req.params.table,
        totalAmount: 0
      });
      user.save().then(user => res.status(201).json(user.orders));
    }
  }).catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/user/removecart/:id
//@desc  delete a CART from the USER
//@access public
router.delete("/removecart/:id", checkAuth, checkUser, (req, res) => {
  User.findOne({ email: req.userData.email }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    } else {
      Cart.findOne({ _id: req.params.id }, (err, cart) => {
        if (cart == null) {
          User.updateOne(
            { email: req.userData.email },
            { $pull: { orders: { cartId: req.params.id } } }
          ).then(() => {
            user.save().then(() => res.status(404).json({ success: false }));
          });
        } else {
          cart.remove().then(() => {
            User.updateOne(
              { email: req.userData.email },
              { $pull: { orders: { cartId: req.params.id } } }
            ).then(() => {
              user.save().then(() => res.status(200).json({ success: true }));
            });
          });
        }
      }).catch(err => res.status(404).json({ success: false }));
    }
  });
});

//@route DELETE api/user/:userId
//@desc  delete a USER
//@access public
/*  router.delete("/deleteuser", checkAuth, UserController.user_delete);*/

module.exports = router;
