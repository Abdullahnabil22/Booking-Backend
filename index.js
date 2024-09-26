const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const paypal = require("./Services/paypal");
const messageRoutes = require("./routes/message");
const reviewRoutes = require("./routes/review");
const flightRoutes = require("./routes/flights");
const roomTypeRoute = require("./routes/rooms");
const bookingRoute = require("./routes/booking");
const carRentalRoute = require("./routes/carRentals");
let hostRouter = require("./routes/hosts");
let apartmentRouter = require("./routes/apartment");
let amenitiesRouter = require("./routes/amenities");
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
app.use("/apartments", apartmentRouter);
app.use("/amenities", amenitiesRouter);
app.use("/messages", messageRoutes);
app.use("/reviews", reviewRoutes);
app.use("/flights", flightRoutes);
app.use("/rooms", roomTypeRoute);
app.use("/bookings", bookingRoute);
app.use("/carRentals", carRentalRoute);
app.use("/user", usersRouter);
app.use("/", (req, res) => {
  res.status(200).json("hello");
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
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

app.post("/pay", async (req, res) => {
  try {
    const url = await paypal.createOrder();

    res.redirect(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/success", async (req, res) => {
  try {
    const paymentId = req.query;
    const response = await paypal.capturePayment(paymentId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/cancel", (req, res) => {
  res.send("Payment cancelled");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
