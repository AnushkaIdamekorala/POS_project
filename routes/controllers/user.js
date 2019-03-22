const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const User = require("../../models/User");
const Cart = require("../../models/Cart");

const JWT_KEY = require("../../config/keys").JWT_KEY;

exports.user_signup = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(400).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              orders: []
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                res.status(400).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_signout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ sucess: true });
};

exports.user_change_total = (req, res) => {
  User.updateOne(
    { email: req.userData.email, "orders.cartId": req.params.id },
    { $set: { "orders.$.totalAmount": req.params.total } }
  )
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(404).json({ success: false }));
};

exports.user_create_order = (req, res) => {
  User.findOne({ email: req.userData.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ success: false });
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
    /* istanbul ignore next */
  }).catch(err => res.status(404).json({ success: false }));
};

exports.user_delete_order = (req, res) => {
  User.findOne({ email: req.userData.email }, (err, user) => {
    if (err) {
      /* istanbul ignore next */
      console.log(err);
      /* istanbul ignore next */
      res.status(500);
      return;
    } else {
      Cart.findOne({ _id: req.params.id }, (err, cart) => {
        cart.remove().then(() => {
          User.updateOne(
            { email: req.userData.email },
            { $pull: { orders: { cartId: req.params.id } } }
          ).then(() => {
            user.save().then(() => res.status(200).json({ success: true }));
          });
        });
        /* istanbul ignore next */
      }).catch(err => res.status(404).json({ success: false }));
    }
  });
};

exports.user_login = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          /* istanbul ignore next */
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            JWT_KEY,
            { expiresIn: 604800 }
          );
          return res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
        return res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      /* istanbul ignore next */
      console.log(err);
      /* istanbul ignore next */
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res) => {
  User.find({ email: req.userData.email })
    .exec()
    .then(user => {
      var itemsOrder = user[0].orders;
      console.log(itemsOrder);
      itemsOrder.forEach(order => {
        console.log(order);
        Cart.findOne({ _id: order.cartId }, (err, cart) => {
          if (cart !== null) {
            cart.remove();
          }
          return;
        });
      });

      return user;
    })
    .then(user => user[0].remove())
    .then(result => {
      console.log("deleted" + req.userData.email);
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      /* istanbul ignore next */
      console.log(err);
      /* istanbul ignore next */
      res.status(500).json({
        error: err
      });
    });
};

/*
exports.user_deleted = (req, res) => {
  User.remove({ email: req.userData.email })
    .exec()
    .then(result => {
      console.log("deleted" + req.userData.email);
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      
      console.log(err);
     
      res.status(500).json({
        error: err
      });
    });
};
*/
