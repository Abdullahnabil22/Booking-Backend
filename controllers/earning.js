const mongoose = require("mongoose");
const Booking = require("../models/bookings");
const Apartment = require("../models/apartments");
const Host = require("../models/hosts");
const router = require("express").Router();

router.get("/:ownerId", async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    // console.log("Querying for ownerId:", ownerId);

    const hosts = await Host.find({ ownerId });
    if (!hosts || hosts.length === 0) {
      return res
        .status(404)
        .json({ message: "No hosts found for this owner." });
    }
    // console.log(
    //   "Hosts found:",
    //   hosts.map((h) => h._id)
    // );

    const apartments = await Apartment.find({ ownerId });
    if (!apartments || apartments.length === 0) {
      return res
        .status(404)
        .json({ message: "No apartments found for this owner." });
    }
    // console.log("Found apartments:", apartments);

    // console.log(
    //   "Host IDs being queried:",
    //   hosts.map((h) => h._id.toString())
    // );
    // console.log(
    //   "Apartment IDs being queried:",
    //   apartments.map((a) => a._id.toString())
    // );

    // Check for existing bookings
    const hostBookingsCount = await Booking.countDocuments({
      host_id: { $in: hosts.map((h) => h._id.toString()) },
    });
    // console.log("Host bookings count:", hostBookingsCount);

    const apartmentBookingsCount = await Booking.countDocuments({
      apartment_id: { $in: apartments.map((a) => a._id.toString()) },
    });
    // console.log("Apartment bookings count:", apartmentBookingsCount);

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
          },
        },
        { $sort: { _id: 1 } },
      ]);
      // console.log("Host bookings aggregation result:", hostBookings);
    } catch (error) {
      // console.error("Error during host bookings aggregation:", error);
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
          totalBookings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    // console.log("Apartment bookings aggregation result:", apartmentBookings);

    // If both aggregations return empty results, perform a simple find operation to check raw data
    if (hostBookings.length === 0 && apartmentBookings.length === 0) {
      const simpleHostBookings = await Booking.find({
        host_id: { $in: hosts.map((h) => h._id.toString()) },
      }).lean();
      // console.log(
      //   "Simple host bookings query result:",
      //   JSON.stringify(simpleHostBookings, null, 2)
      // );

      const simpleApartmentBookings = await Booking.find({
        apartment_id: { $in: apartments.map((a) => a._id.toString()) },
      }).lean();
      // console.log(
      //   "Simple apartment bookings query result:",
      //   JSON.stringify(simpleApartmentBookings, null, 2)
      // );
    }

    res.json({ apartmentBookings, hostBookings });
  } catch (error) {
    // console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
