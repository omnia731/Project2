var express = require('express');
const router = express.Router();

var warehouseController = require('../src/warehouses/warehouseController');
var eventController = require('../src/events/eventController');
var inventoryController = require('../src/inventory/inventoryController');

const WarehouseService = require('../src/events/eventService');

// -------- Events Routes --------
router.post('/events/item-arrived', async (req, res) => {
  try {
    const savedEvent = await WarehouseService.createEvent(req.body);
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('❌ Error in /events/item-arrived POST:', err);
    res.status(500).json({ error: 'Failed to save event' });
  }
});


// -------- Other Event Types --------
router.post('/events/item-dispatched', async (req, res) => {
  try {
    const savedEvent = await WarehouseService.createEvent(req.body);
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('❌ Error in /events/item-dispatched POST:', err);
    res.status(500).json({ error: 'Failed to save dispatched event' });
  }
});

router.post('/events/low-stock', async (req, res) => {
  try {
    const savedEvent = await WarehouseService.createEvent(req.body);
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error('❌ Error in /events/low-stock POST:', err);
    res.status(500).json({ error: 'Failed to save low-stock event' });
  }
});




router.get('/events', eventController.getAllEvents);
router.get('/events/items/:id', eventController.getItemsInWarehouse);

// -------- Inventory Routes --------
router.post('/inventory/arrived', inventoryController.handleItemArrived);
router.post('/inventory/dispatched', inventoryController.handleItemDispatched);
router.get('/inventory/available', inventoryController.getAvailableItems);
router.get('/inventory/low-stock-candidates', inventoryController.getLowStockItems);

// -------- Warehouse Routes --------
router.get('/warehouses', warehouseController.getAllWarehouses);
router.get('/warehouses/:name', warehouseController.getWarehouseByName);
router.get('/warehouses/:name/items', warehouseController.getWarehouseItemsByName);

module.exports = router;

