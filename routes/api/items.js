const express = require("express");
const router = express.Router();

//Item Model
const Item = require("../../models/Item");
const checkAuth = require("../middleware/check-auth");

const ItemController = require("../controllers/items");

//@route GET api/items
//@desc Get All items
//@access public
router.get("/", checkAuth, ItemController.items_getAll);

//@route POST api/items
//@desc create a ITEM
//@access public
router.post("/", checkAuth, ItemController.items_addItem);

//@route DELETE api/items/:id
//@desc delete a ITEM
//@access public
router.delete("/:id", checkAuth, ItemController.items_delete);

module.exports = router;
