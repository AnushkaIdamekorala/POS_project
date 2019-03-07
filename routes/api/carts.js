const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Cart Model

const Cart = require("../../models/Cart");
const checkAuth = require("../middleware/check-auth");
const checkUser = require("../middleware/check-user");

router.get("/:id", checkAuth, checkUser, (req, res) => {
  Cart.findById(req.params.id)
    .populate("items.itm")
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ success: false }));
});

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
          cart.save().then(function() {
            Cart.findById(req.body._id)
              .populate("items.itm")
              .then(item => res.status(200).json(item));
          });
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
            .catch(err => res.status(400).json({ success: false }));
        }
      }
    });
  } else {
    res.status(400);
  }
});

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
        },
        function(err, itId) {
          if (err) {
            res.status(404).json({ success: false });
          } else {
            res.status(204).json({ success: true });
          }
        }
      );
    }
  });
});

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
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
