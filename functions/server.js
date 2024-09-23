const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const messageRoutes = require("../routes/message");
const reviewRoutes = require("../routes/review");
const flightRoutes = require("../routes/flights");
const roomTypeRoute = require("../routes/rooms");
const bookingRoute = require("../routes/booking");
const carRentalRoute = require("../routes/carRentals");
const hostRouter = require("../routes/hosts");
const userRouter = require("../routes/hostUser");
const usersRouter = require("../routes/user");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

// Use your routes
app.use("/host", hostRouter);
app.use("/hostUser", userRouter);
app.use("/messages", messageRoutes);
app.use("/reviews", reviewRoutes);
app.use("/flights", flightRoutes);
app.use("/roomTypes", roomTypeRoute);
app.use("/bookings", bookingRoute);
app.use("/carRentals", carRentalRoute);
app.use("/user", usersRouter);

app.use("*", (req, res) => {
  res.status(404).json("Wrong Path");
});

// Database connection function (to be used in route handlers)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to booking db");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

// Example of how to use connectDB in a route
app.get("/test-db", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
});

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
module.exports.handler = serverless(app);
