const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Cart = require("../../models/Cart");

exports.cart_get = (req, res) => {
  Cart.findById(req.params.id)
    .populate("items.itm")
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ success: false }));
};

exports.cart_addItem = (req, res) => {
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
            /* istanbul ignore next */
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
            /* istanbul ignore next */
            .catch(err => res.status(404).json({ success: false }));
        }
      }
    });
  } else {
    return res.status(400).json({ success: false });
  }
};

exports.cart_changeTotal = (req, res) => {
  if (!isNaN(req.params.count) && req.params.count >= 0) {
    Cart.updateOne(
      { _id: req.params.id, "items._id": req.params.itemId },
      { $set: { "items.$.count": req.params.count } }
    )
      .then(() => res.status(200).json({ success: true }))
      .catch(() => res.status(404).json({ success: false }));
  } else {
    return res
      .status(400)
      .json({ message: "Count should be a postiove number" });
  }
};

exports.cart_removeItem = (req, res) => {
  Cart.findById(req.params.id, function(err, cart) {
    if (err) {
      /* istanbul ignore next */
      res.status(404).json({ success: false });
      /* istanbul ignore next */
      return;
    } else {
      Cart.updateOne(
        { "items._id": req.params.itemId },
        {
          $pull: {
            items: { _id: req.params.itemId }
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
};

exports.cart_clear = (req, res) => {
  Cart.findById(req.params.id, function(err, cart) {
    if (err) {
      /* istanbul ignore next */
      res.status(404).json({ success: false });
      /* istanbul ignore next */
      return;
    } else {
      cart.items = [];
      cart.save();
    }
  })
    .then(() => res.status(204).json({ success: true }))
    /* istanbul ignore next */
    .catch(err => res.status(404).json({ success: false }));
};
