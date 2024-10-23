const Booking = require("../models/bookings");
const RoomType = require("../models/roomTypes");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { hotelId, checkInDate, checkOutDate } = req.body;
    console.log(
      `Checking availability for dates: ${checkInDate} to ${checkOutDate}`
    );

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn >= checkOut) {
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    const roomTypes = await RoomType.find({ hotelID: hotelId });
    console.log(roomTypes);
    const availability = {};

    for (const roomType of roomTypes) {
      const overlappingBookings = await Booking.find({
        room_id: roomType._id,
        status: { $nin: ["CANCELLED", "COMPLETED"] },
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
      console.log(
        `Overlapping bookings for room type ${roomType._id}:`,
        overlappingBookings
      );

      const roomsBooked = overlappingBookings.reduce((total, booking) => {
        const roomCount = booking.room_id.filter(
          (id) => id.toString() === roomType._id.toString()
        ).length;
        return total + roomCount;
      }, 0);

      const availableRooms = Math.max(
        0,
        roomType.numberOfRoomsWithThisType - roomsBooked
      );
      availability[roomType._id] = availableRooms;
    }
    console.log("Final availability:", availability);
    res.status(200).json(availability);
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Error checking room availability" });
  }
};
