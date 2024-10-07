const mongoose = require("mongoose");
const Booking = require("../models/bookings");
const Apartment = require("../models/apartments");
const Host = require("../models/hosts");
const router = require("express").Router();



router.get("/:ownerId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const hosts = await Host.find({ ownerId });
    if (!hosts || hosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No hosts found for this owner." });
    }
    const apartments = await Apartment.find({ ownerId });
    if (!apartments || apartments.length === 0) {
      return res
        .status(404)
        .json({ message: "No apartments found for this owner." });
    }
    const hostBookingsCount = await Booking.countDocuments({
      host_id: { $in: hosts.map((h) => h._id.toString()) },
    });
    const apartmentBookingsCount = await Booking.countDocuments({
      apartment_id: { $in: apartments.map((a) => a._id.toString()) },
    });

    let hostBookings = [];

    try {
      hostBookings = await Booking.aggregate([
        {
          $match: {
            host_id: { $in: hosts.map((h) => h._id.toString()) },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: { $toDate: "$booking_date" },
                timezone: "UTC",
              },
            },
            totalEarnings: { $sum: "$payment.amount" },
            totalMembers: { $sum: "$members" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
    } catch (error) {
      console.error("Error during host bookings aggregation:", error);
    }

    const apartmentBookings = await Booking.aggregate([
      {
        $match: {
          apartment_id: {
            $in: apartments.map((a) => a._id.toString()),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: { $toDate: "$booking_date" },
              timezone: "UTC",
            },
          },
          totalEarnings: { $sum: "$payment.amount" },
          totalMembers: { $sum: "$members" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    if (hostBookings.length === 0 && apartmentBookings.length === 0) {
      const simpleHostBookings = await Booking.find({
        host_id: { $in: hosts.map((h) => h._id.toString()) },
      }).lean();
      const simpleApartmentBookings = await Booking.find({
        apartment_id: { $in: apartments.map((a) => a._id.toString()) },
      }).lean();
    }

    res.json({ apartmentBookings, hostBookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
