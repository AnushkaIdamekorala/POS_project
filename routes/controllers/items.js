const mongoose = require("mongoose");
const Item = require("../../models/Item");

exports.items_getAll = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ success: false }));
};

exports.items_addItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    available: req.body.available,
    image: req.body.image
  });

  newItem
    .save()
    .then(item => res.status(201).json(item))
    .catch(err => res.status(400).json({ success: false }));
};

exports.items_delete = (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => res.status(200).json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
};
