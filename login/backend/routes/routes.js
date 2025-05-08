var express = require('express');
const router = express.Router();
var userController = require('../src/user/userController');
// var warehouseController = require('../src/warehouses/warehouseController'); // إضافة الـ controller الخاص بالمخازن

// مسارات المستخدم
router.route('/user/getAll').get(userController.getDataControllerfn);
router.route('/user/create').post(userController.createUserControllerfn);
router.route('/user/update/:id').patch(userController.updateUserControllerfn);
router.route('/user/login').post(userController.loginUserControllerfn);  // New login route

// مسارات المخازن
// router.route('/warehouses').get(warehouseController.getAllWarehouses);  // مسار الحصول على جميع المخازن
// router.route('/warehouses/:name').get(warehouseController.getWarehouseByName);  // مسار الحصول على مخزن بواسطة الاسم

module.exports = router;
