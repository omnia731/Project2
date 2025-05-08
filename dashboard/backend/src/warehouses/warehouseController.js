const Warehouse = require('./warehouseModel');
const Event = require('../events/eventModel');

// جميع المخازن
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching warehouses", error: error.message });
  }
};

// البحث بالاسم
exports.getWarehouseByName = async (req, res) => {
  const { name } = req.params;
  try {
    const warehouse = await Warehouse.findOne({ name });
    if (warehouse) {
      res.json(warehouse);
    } else {
      res.status(404).json({ message: "Warehouse not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching warehouse", error: error.message });
  }
};



exports.getWarehouseItemsByName = async (req, res) => {
  const { name } = req.params;
  try {
    const warehouse = await Warehouse.findOne({ name });
    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    // استخدام aggregation لتجميع آخر حالة لكل item في هذا المخزن
    const items = await Event.aggregate([
      { $match: { warehouseId: warehouse.warehouseId } },
      { $sort: { timestamp: -1 } },  // ترتيب الأحداث الأحدث أولًا
      {
        $group: {
          _id: "$itemId",
          itemName: { $first: "$itemName" },
          quantity: { $first: { $ifNull: ["$currentStock", "$quantity"] } },
          threshold: { $first: "$threshold" }
        }
      }
    ]);

    res.json(items);
  } catch (error) {
    console.error("❌ Error in getWarehouseItemsByName:", error);
    res.status(500).json({ message: "Error fetching warehouse items", error: error.message });
  }
};
