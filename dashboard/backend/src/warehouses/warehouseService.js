const axios = require('axios'); // استخدام axios لإرسال طلبات HTTP

class WarehouseService {
  constructor() {
    this.apiUrl = 'http://192.168.106.7:8000/api/warehouses'; // رابط الـ API الخاص بك في الـ backend
  }

  // دالة لعرض جميع المخازن
  getWarehouses() {
    return axios.get(this.apiUrl) // إرسال طلب GET للمخازن
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching warehouses:', error);
        throw error;
      });
  }

  // دالة لعرض مخزن معين حسب اسمه
  getWarehouseByName(name) {
    const encodedName = encodeURIComponent(name); // ترميز الاسم قبل إضافته للـ URL
    return axios.get(`${this.apiUrl}/${encodedName}`) // إرسال طلب GET للمخزن المحدد حسب الاسم
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching warehouse ${name}:`, error);
        throw error;
      });
  }

  getItemsInWarehouse(id) {
    return axios.get(`${this.apiUrl}/items/${id}`) // استدعاء API للـ items
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching items for warehouse ${id}:`, error);
        throw error;
      });
}

}




module.exports = WarehouseService;
