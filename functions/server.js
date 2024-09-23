const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const app = express();
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

app.use(cors({ origin: "*" }));
app.use(express.json());

// Use your routes
app.use("/.netlify/functions/server/host", hostRouter);
app.use("/.netlify/functions/server/hostUser", userRouter);
app.use("/.netlify/functions/server/messages", messageRoutes);
app.use("/.netlify/functions/server/reviews", reviewRoutes);
app.use("/.netlify/functions/server/flights", flightRoutes);
app.use("/.netlify/functions/server/roomTypes", roomTypeRoute);
app.use("/.netlify/functions/server/bookings", bookingRoute);
app.use("/.netlify/functions/server/carRentals", carRentalRoute);
app.use("/.netlify/functions/server/user", usersRouter);

app.use("*", (req, res) => {
  res.status(404).json("Wrong Path");
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to booking db");
  } catch (error) {
    console.log(error.message);
  }
};

connect();

module.exports.handler = serverless(app);
