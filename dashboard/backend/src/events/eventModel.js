const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  warehouseId: { type: String, ref: 'Warehouse', required: true },
  eventType: { type: String },
  itemId: { type: String },
  itemName: { type: String },
  timestamp: { type: String },
  quantity: { type: Number },
  threshold: { type: Number },
  currentStock: { type: Number },

  // 💡 تعريف location ككائن فيه lat و lng
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }

}, { strict: true }); // رجعنا strict=true لأن الحقول كلها الآن معرفة

module.exports = mongoose.model('Event', eventSchema);

