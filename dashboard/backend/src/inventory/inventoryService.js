const Inventory = require('./inventoryModel');

exports.addOrUpdateItem = async ({ warehouseId, itemId, itemName, quantity, threshold }) => {
  let item = await Inventory.findOne({ warehouseId, itemId });

  if (item) {
    item.currentStock += quantity;
    item.quantity += quantity;
    await item.save();
    return item;
  } else {
    const newItem = new Inventory({
      warehouseId,
      itemId,
      itemName,
      quantity,
      threshold,
      currentStock: quantity
    });
    await newItem.save();
    return newItem;
  }
};

exports.dispatchItem = async ({ warehouseId, itemId, quantity }) => {
  const item = await Inventory.findOne({ warehouseId, itemId });
  if (!item || item.currentStock < quantity) {
    throw new Error('Insufficient stock');
  }
  item.currentStock -= quantity;
  await item.save();
  return item;
};

exports.getAvailableItems = () => {
  return Inventory.find({ currentStock: { $gt: 0 } });
};

exports.getLowStockItems = () => {
  return Inventory.find({ $expr: { $lte: ['$currentStock', '$threshold'] } });
};

