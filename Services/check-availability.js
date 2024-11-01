const Booking = require("../models/bookings");
const RoomType = require("../models/roomTypes");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { hotelId, checkInDate, checkOutDate } = req.body;
    console.log("Request body:", { hotelId, checkInDate, checkOutDate });

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    console.log("Parsed dates:", { checkIn, checkOut });
    if (checkIn >= checkOut) {
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    const roomTypes = await RoomType.find({ hotelID: hotelId });
    console.log("Found room types:", roomTypes);

    const availability = {};
    console.log("Initial availability object:", availability);

    for (const roomType of roomTypes) {
      console.log("\nProcessing room type:", roomType);

      const overlappingBookings = await Booking.find({
        room_id: roomType._id,
        status: { $nin: ["CANCELLED"] },
        $or: [
          {
            check_in_date: { $lt: checkOut },
            check_out_date: { $gt: checkIn },
          },
          {
            check_in_date: { $eq: checkIn },
          },
          {
            check_out_date: { $eq: checkOut },
          },
        ],
      });
      console.log("Overlapping bookings found:", overlappingBookings);

      const roomsBooked = overlappingBookings.reduce((total, booking) => {
        const roomCount = booking.room_id.filter(
          (id) => id.toString() === roomType._id.toString()
        ).length;
        console.log("Room count for booking:", {
          bookingId: booking._id,
          roomCount,
        });
        return total + roomCount;
      }, 0);
      console.log("Total rooms booked:", roomsBooked);

      const availableRooms = Math.max(
        0,
        roomType.numberOfRoomsWithThisType - roomsBooked
      );
      console.log("Available rooms calculated:", {
        roomTypeId: roomType._id,
        total: roomType.numberOfRoomsWithThisType,
        booked: roomsBooked,
        available: availableRooms,
      });

      availability[roomType._id] = availableRooms;
    }

    console.log("Final availability result:", availability);

    res.status(200).json(availability);
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Error checking room availability" });
  }
};
