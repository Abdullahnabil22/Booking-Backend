const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const messageRoutes = require("./routes/message");
const reviewRoutes = require("./routes/review");
const flightRoutes = require("./routes/flights");
const roomTypeRoute = require("./routes/rooms");
const bookingRoute = require("./routes/booking");
const carRentalRoute = require("./routes/carRentals");
let hostRouter = require("./routes/hosts");
let userRouter = require("./routes/hostUser");
var usersRouter = require("./routes/user");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/host", hostRouter);
app.use("/hostUser", userRouter);
app.use("/messages", messageRoutes);
app.use("/reviews", reviewRoutes);
app.use("/flights", flightRoutes);
app.use("/roomTypes", roomTypeRoute);
app.use("/bookings", bookingRoute);
app.use("/carRentals", carRentalRoute);
app.use("/user", usersRouter);
// app.use("*", (req, res) => {
//   res.status(404).json("Wrong Path");
// });

app.listen(3000, () => {
  connect();
  console.log("Connected to backend ");
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to booking db");
  } catch (error) {
    console.log(error.message);
  }
};
