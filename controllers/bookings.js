const Booking = require("../models/bookings");

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getBookingByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getBookingByHostId = async (req, res) => {
  try {
    const bookings = await Booking.find({ host_id: req.params.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getBookingByApartmentId = async (req, res) => {
  try {
    const bookings = await Booking.find({ apartment_id: req.params.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("hotelId")
      .populate("roomTypeId");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json("Booking has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
