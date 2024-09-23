const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
    booking_date: {
      type: Date,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
      required: true,
    },
    members: {
      type: Number,
      required: true,
    },
    payment: {
      status: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      method: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      coin: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
