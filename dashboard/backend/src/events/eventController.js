var Event = require('./eventModel');
var Warehouse = require('../warehouses/warehouseModel');
const eventService = require('./eventService');



const createEvent = async (req, res) => {
  try {
    const savedEvent = await eventService.createEvent(req.body);
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};



const getItemsInWarehouse = async (req, res) => {
  const warehouseId = req.params.id;

  try {
    // 1. جيب بيانات المخزن نفسه
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });

    // 2. pipeline لحساب الكميات
    const pipeline = [
      { $match: { warehouseId } },
      {
        $group: {
          _id: "$itemName",
          totalArrived: {
            $sum: {
              $cond: [{ $eq: ["$eventType", "item-arrived"] }, "$quantity", 0]
            }
          },
          totalDispatched: {
            $sum: {
              $cond: [{ $eq: ["$eventType", "item-dispatched"] }, "$quantity", 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          itemName: "$_id",
          quantity: { $subtract: ["$totalArrived", "$totalDispatched"] }
        }
      }
    ];

    const items = await Event.aggregate(pipeline);

    // 3. رجع استجابة منظمة زي الشكل اللي في الصورة
    res.json({
      warehouseName: warehouse.name,
      location: warehouse.location,
      items
    });

  } catch (err) {
    res.status(500).json({ message: "Aggregation error", error: err.message });
  }
};




module.exports = {
  createEvent,
  getAllEvents,
  getItemsInWarehouse,
};
