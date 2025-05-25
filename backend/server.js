const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the CollabX Backend!");
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log(err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
