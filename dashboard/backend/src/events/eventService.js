const axios = require('axios'); // استخدام axios لإرسال طلبات HTTP
const Event = require('./eventModel');  // تأكد من وجود المسار الصحيح لهذا الملف

 class WarehouseService {
    constructor() {
    this.apiUrl = 'http://192.168.106.4:8001/api/warehouses'; // رابط الـ API الخاص بك في الـ backend
  }

  // دالة لإنشاء event
  async createEvent(eventData) {
    const event = new Event(eventData);
    return await event.save();
  }

  // دالة لاسترجاع كل الأحداث
  async getAllEvents() {
    return await Event.find();
  }
}

module.exports = new WarehouseService();  // تصدير الكائن من الكلاس

