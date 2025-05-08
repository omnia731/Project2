const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  warehouseId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: [Number], required: true },  // الـ location عبارة عن مصفوفة تحتوي على الإحداثيات
});

module.exports = mongoose.model('Warehouse', warehouseSchema);

