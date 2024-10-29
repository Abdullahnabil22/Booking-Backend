const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketService = require("./Services/Socket.IOService");
require("dotenv").config();

const io = socketService.initializeSocket(server);

app.use(
  cors({
    origin: [
      "http://localhost:50335",
      "http://localhost:4200",
      "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json());

app.set("socketio", socketService.getIO());

const cloudinary = require("./Services/cloudinary");
const { paypal, router: paypalRouter } = require("./Services/paypal");
const reviewRoutes = require("./routes/review");
const flightRoutes = require("./routes/flights");
const roomTypeRoute = require("./routes/rooms");
const bookingRoute = require("./routes/booking");
const carRentalRoute = require("./routes/carRentals");
const hostRouter = require("./routes/hosts");
const apartmentRouter = require("./routes/apartment");
const amenitiesRouter = require("./routes/amenities");
const usersRouter = require("./routes/user");
const messageRoutes = require("./controllers/message");
const cloudinaryRouter = require("./Services/cloudinary").router;
const earningRouter = require("./controllers/earning");
const visitorRouter = require("./controllers/visitors");
const checkAvailabilityHandler = require("./Services/check-availability");
const ownerBalanceRouter = require("./controllers/ownerBalance");
const payoutRequestRouter = require("./controllers/payoutRequest");
const bookingFinancialsRouter = require("./controllers/bookingFinancials");
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
app.use("/cloudinary", cloudinaryRouter);
app.use("/paypal", paypalRouter);
app.use("/earnings", earningRouter);
app.use("/visitor", visitorRouter);
app.use("/check-availability", checkAvailabilityHandler);
app.use("/ownerBalance", ownerBalanceRouter);
app.use("/payoutRequest", payoutRequestRouter);
app.use("/bookingFinancials", bookingFinancialsRouter);
app.use("/", (req, res) => {
  res.status(200).json("Server is running");
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
