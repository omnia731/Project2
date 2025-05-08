const InventoryService = require('./inventoryService');

exports.handleItemArrived = async (req, res) => {
  try {
    const item = await InventoryService.addOrUpdateItem(req.body);
    res.status(200).json(item);
  } catch (err) {
    console.error('❌ handleItemArrived:', err);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};

exports.handleItemDispatched = async (req, res) => {
  try {
    const item = await InventoryService.dispatchItem(req.body);
    res.status(200).json(item);
  } catch (err) {
    console.error('❌ handleItemDispatched:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableItems = async (req, res) => {
  try {
    const items = await InventoryService.getAvailableItems();
    res.json(items);
  } catch (err) {
    console.error('❌ getAvailableItems:', err);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const items = await InventoryService.getLowStockItems();
    res.json(items);
  } catch (err) {
    console.error('❌ getLowStockItems:', err);
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
};

