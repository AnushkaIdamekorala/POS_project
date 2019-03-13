const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");
const checkAuth = require("../middleware/check-auth");

//@route GET api/items
//@desc Get All items
//@access public
router.get("/", checkAuth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ success: false }));
});

//@route POST api/items
//@desc create a ITEM
//@access public
router.post("/", checkAuth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    available: req.body.available
  });

  newItem
    .save()
    .then(item => res.status(201).json(item))
    .catch(err => res.status(400).json({ success: false }));
});

//@route DELETE api/items/:id
//@desc delete a ITEM
//@access public
router.delete("/:id", checkAuth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
