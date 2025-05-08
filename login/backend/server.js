var express = require('express');
var app = express();  // ← استخدمي app بدل server
var routes = require('./routes/routes');  // استخدام routes.js بدل warehouse.routes
const cors = require('cors');
var mongoose = require("mongoose");
require('dotenv').config();

// Database connection using .env variables
const dbURI = process.env.MONGODB_URI || "mongodb://192.168.106.4:27017/loginDB";

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

// Routes
app.use(routes);  // توجيه المسارات من هنا

// Start server
app.listen(8000, function check(error) {
    if (error) {
        console.log("Error starting server:", error.message);
    } else {
        console.log("Server started on port 8001 :)");
    }
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason) => {
    console.log('Unhandled Rejection:', reason);
});
