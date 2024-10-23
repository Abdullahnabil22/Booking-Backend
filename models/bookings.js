const mongoose = require("mongoose");
const RoomType = require("./roomTypes");

const BookingSchema = new mongoose.Schema(
  {
    check_in_date: {
      type: Date,
    },
    check_out_date: {
      type: Date,
    },
    booking_date: {
      type: Date,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hosts",
    },
    members: {
      type: Number,
    },
    payment: {
      status: {
        type: String,
      },
      date: {
        type: Date,
      },
      method: {
        type: String,
      },
      amount: {
        type: Number,
      },
      coin: {
        type: String,
      },
      payment_id: {
        type: String,
      },
    },
    commission: {
      rate: {
        type: Number,
        default: 0.05,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    room_id: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Room",
    },
    email: {
      type: String,
    },
    numberOfNights: {
      type: Number,
    },
    numberOfRooms: {
      type: Number,
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);

async function updateRoomAvailability() {
  try {
    const completedBookings = await Booking.find({
      check_out_date: { $lt: new Date() },
      status: { $nin: ["COMPLETED", "CANCELLED"] },
    });

    for (const booking of completedBookings) {
      const roomTypeIds = booking.room_id;

      const roomTypeCounts = {};
      for (const roomTypeId of roomTypeIds) {
        const count = roomTypeIds.filter(
          (id) => id.toString() === roomTypeId.toString()
        ).length;
        roomTypeCounts[roomTypeId] = count;
      }

      for (const [roomTypeId, count] of Object.entries(roomTypeCounts)) {
        const roomType = await RoomType.findById(roomTypeId);

        if (roomType) {
          booking.status = "COMPLETED";
          await booking.save();

          const currentBookings = await Booking.find({
            room_id: { $elemMatch: { $in: booking.room_id } },
            status: { $nin: ["COMPLETED", "CANCELLED", "PENDING"] },
            check_out_date: { $gt: new Date() },
          });

          if (currentBookings.length === 0) {
            roomType.available = true;
            await roomType.save();
          }
        }
      }
    }
  } catch (error) {
    console.error("Error updating room availability:", error);
  }
}

BookingSchema.pre("save", async function (next) {
  try {
    const booking = this;

    if (!booking.isNew) {
      return next();
    }

    const roomIds = booking.room_id;

    const rooms = await RoomType.find({
      _id: { $in: roomIds },
    }).distinct("_id");

    const roomTypeCounts = {};
    for (const roomTypeId of rooms) {
      const count = rooms.filter(
        (id) => id.toString() === roomTypeId.toString()
      ).length;
      roomTypeCounts[roomTypeId] = count;
    }

    for (const [roomTypeId, count] of Object.entries(roomTypeCounts)) {
      const roomType = await RoomType.findById(roomTypeId);

      if (!roomType) {
        throw new Error(`Room type ${roomTypeId} not found`);
      }

      // Find overlapping bookings
      const overlappingBookings = await Booking.find({
        room_id: { $elemMatch: { $in: roomIds } },
        status: { $nin: ["CANCELLED", "COMPLETED", "PENDING"] },
        $or: [
          {
            check_in_date: { $lte: booking.check_out_date },
            check_out_date: { $gte: booking.check_in_date },
          },
        ],
      });

      const roomsBooked = overlappingBookings.reduce((total, booking) => {
        const roomsOfType = booking.room_id.filter((id) =>
          rooms.includes(id.toString())
        ).length;
        return total + roomsOfType;
      }, 0);

      const availableRooms = roomType.numberOfRoomsWithThisType - roomsBooked;
      if (availableRooms < count) {
        throw new Error(
          `Not enough rooms available for room type ${roomType.name.en} during the selected dates`
        );
      }

      if (availableRooms - count <= 0) {
        roomType.available = false;
        await roomType.save();
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

setInterval(updateRoomAvailability, 24 * 60 * 60 * 1000);

updateRoomAvailability();

module.exports = Booking;
