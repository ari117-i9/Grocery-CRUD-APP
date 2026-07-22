const express = require('express')
const router = express.Router()
const {getInventory, getProduct, addInventory, updateInventory, deleteInventory} = require("../controllers/inventoryController")

//routes
router.get('/', getInventory)

router.get('/:id', getProduct)

router.post('/', addInventory)

router.put('/:id', updateInventory)

router.delete('/:id', deleteInventory)

module.exports = router;