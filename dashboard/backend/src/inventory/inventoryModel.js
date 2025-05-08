const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  warehouseId: String,
  itemId: String,
  itemName: String,
  quantity: Number,
  threshold: Number,
  currentStock: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);

