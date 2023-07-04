const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

// Create a new item
router.post('/items', itemController.createItem);

// Get all items
router.get('/items', itemController.getItems);

// Get an item by ID
router.get('/items/:id', itemController.getItemById);

// Update an item
router.put('/items/:id', itemController.updateItem);

// Delete an item
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
