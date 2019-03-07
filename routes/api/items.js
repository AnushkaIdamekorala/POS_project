const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");
const checkAuth = require("../middleware/check-auth");

//@route GET api/itemss
//@desc Get All items
//@access pUBLIC
router.get("/", checkAuth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ success: false }));
});

//@route POST api/itemss
//@desc create a ITEM
//@access pUBLIC
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

//@route DELETE api/itemss/:ID
//@desc dELETE A ITEM
//@access pUBLIC
router.delete("/:id", checkAuth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
