const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//CART Model

const Cart = require("../../models/Cart");
const checkAuth = require("../middleware/check-auth");
const checkUser = require("../middleware/check-user");

//@route GET api/carts/:id
//@desc get a given CART
//@access public
router.get("/:id", checkAuth, checkUser, (req, res) => {
  Cart.findById(req.params.id)
    .populate("items.itm")
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ success: false }));
});

//@route POST api/carts
//@desc add an ITEM to a given CART
//@access public
router.post("/", checkAuth, checkUser, (req, res) => {
  if (
    req.body.hasOwnProperty("_id") &&
    req.body.hasOwnProperty("count") &&
    req.body.hasOwnProperty("itm")
  ) {
    Cart.findById(req.body._id, function(err, cart) {
      if (err) {
        console.log(err);
        return;
      } else if (isNaN(req.body.count)) {
        return res.status(400).json({ success: false });
      } else {
        let flag = false;
        let index = 0;
        let fI = 0;
        for (let item of cart.items) {
          if (item.itm == req.body.itm) {
            flag = true;
            fI = index;
          }
          index = index + 1;
        }
        if (flag) {
          cart.items[fI].count = req.body.count;
          cart
            .save()
            .then(function() {
              Cart.findById(req.body._id)
                .populate("items.itm")
                .then(item => res.status(200).json(item));
            })
            .catch(err => res.status(404).json({ success: false }));
        } else {
          let pushItm = { itm: req.body.itm, count: req.body.count };
          cart.items.push(pushItm);
          cart
            .save()
            .then(function() {
              Cart.findById(req.body._id)
                .populate("items.itm")
                .then(item => res.status(200).json(item));
            })
            .catch(err => res.status(404).json({ success: false }));
        }
      }
    });
  } else {
    res.status(400);
  }
});

//@route PUT api/carts/:id/:itId/:count
//@desc change count of a ITEM in a given CART
//@access public
router.put("/:id/:itId/:count", checkAuth, checkUser, (req, res) => {
  if (!isNaN(req.params.count) && req.params.count >= 0) {
    Cart.updateOne(
      { _id: req.params.id, "items._id": req.params.itId },
      { $set: { "items.$.count": req.params.count } }
    )
      .then(() => res.status(200).json({ success: true }))
      .catch(() => res.status(404).json({ success: false }));
  } else {
    return res
      .status(400)
      .json({ message: "Count should be a postiove number" });
  }
});

//@route DELETE api/carts/:id/:itId
//@desc delete an ITEM in a given CART
//@access public
router.delete("/:id/:itId", checkAuth, checkUser, (req, res) => {
  Cart.findById(req.params.id, function(err, cart) {
    if (err) {
      res.status(404).json({ success: false });
      return;
    } else {
      Cart.updateOne(
        { "items._id": req.params.itId },
        {
          $pull: {
            items: { _id: req.params.itId }
          }
        }
      )
        .then(result => {
          if (result.nModified !== 0) {
            res.status(204).json({ success: true });
          } else {
            res.status(404).json({ success: false });
          }
        })
        .catch(() => res.status(404).json({ success: false }));
    }
  });
});

//@route DELETE api/carts/:id
//@desc delete all the ITEMs in a given CART
//@access public
router.delete("/:id", checkAuth, checkUser, (req, res) => {
  Cart.findById(req.params.id, function(err, cart) {
    if (err) {
      res.status(404).json({ success: false });
      return;
    } else {
      cart.items = [];
      cart.save();
    }
  })
    .then(() => res.status(204).json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
