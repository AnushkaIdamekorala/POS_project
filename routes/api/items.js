const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");

//@route GET api/itemss
//@desc Get All items
//@access pUBLIC
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//@route POST api/itemss
//@desc create a ITEM
//@access pUBLIC
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description
  });

  newItem.save().then(item => res.json(item));
});

//@route DELETE api/itemss/:ID
//@desc dELETE A ITEM
//@access pUBLIC
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
