var express = require('express');
var app = express();  // ← استخدمي app بدل server
var routes = require('./routes/routes');  // استخدام routes.js بدل warehouse.routes
const cors = require('cors');
var mongoose = require("mongoose");
require('dotenv').config();
const jwt = require('jsonwebtoken');  // استيراد مكتبة jwt للتحقق من الـ token

// Database connection using .env variables
const dbURI = process.env.MONGODB_URI || "mongodb://192.168.106.4:27017/dashboardDB";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected!");
}).catch((error) => {
    console.log("Database connection error:", error.message);
});

app.use(express.json());
app.use(cors()); 

// Middleware للتحقق من الـ token
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];  // استخراج الـ token من الـ header

  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');

    req.userId = decoded.userId;  // تخزين الـ userId المستخرج من الـ token
    next();  // متابعة التنفيذ للمسار التالي
  });
}

// Routes
app.use('/api', routes);  // توجيه المسارات من هنا

// مثال لroute محمي بالـ token
app.get('/api/dashboard-data', verifyToken, (req, res) => {
  const userId = req.userId;  // جلب الـ userId من الـ token
  res.json({ message: `Dashboard data for user: ${userId}` });
});

// Start server
app.listen(8000, function check(error) {
    if (error) {
        console.log("Error starting server:", error.message);
    } else {
        console.log("Server started on port 8000 :)");
    }
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason) => {
    console.log('Unhandled Rejection:', reason);
});
