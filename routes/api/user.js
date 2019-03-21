const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../../models/User");

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
router.get("/signout", checkAuth, UserController.user_signout);

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
router.put("/cash/:id/:total", checkAuth, UserController.user_change_total);

//@route GET api/user/create/:table
//@desc  create a new CART for the USER
//@access public
router.get("/create/:table", checkAuth, UserController.user_create_order);

//@route DELETE api/user/removecart/:id
//@desc  delete a CART from the USER
//@access public
router.delete(
  "/removecart/:id",
  checkAuth,
  checkUser,
  UserController.user_delete_order
);

//@route DELETE api/user/:userId
//@desc  delete a USER
//@access public
router.delete("/deleteuser", checkAuth, UserController.user_delete);

module.exports = router;
