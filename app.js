require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models/User.js');
const { Expense } = require('./models/Expense.js');
const cors = require('cors');
const path = require('path');

mongoose.connect(process.env.MONGO_URL);
const app = express();
app.use(cors({
  origin: true, // Adjust as needed for your setup
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/', (req, res) => res.send("HELLO"));

// Your API routes here (e.g., /register, /login, etc.)

// Deployment Configuration
const __dirname1 = path.resolve(); // Use a single __dirname variable

if (process.env.NODE_ENV === "production") {
  // Serve static files from the build folder during production
  app.use(express.static(path.join(__dirname1, "SilverSaving-frontend/build")));

  // Handle all unmatched routes (serves index.html)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "SilverSaving-frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
