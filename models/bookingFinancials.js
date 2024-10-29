const mongoose = require("mongoose");
const OwnerBalance = require("./ownerBalance");
const Host = require("./hosts");

const BookingFinancialsSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    total_amount: {
      type: Number,
    },
    amount_after_paypal_commission: {
      type: Number,
    },
    website_commission: {
      type: Number,
    },
    host_payout: {
      type: Number,
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hosts",
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    payout_status: {
      type: String,
      enum: ["UNPAID", "REQUESTED", "PAID"],
      default: "UNPAID",
    },
    payout_request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayoutRequest",
    },
  },
  { timestamps: true }
);

const BookingFinancials = mongoose.model(
  "BookingFinancials",
  BookingFinancialsSchema
);

module.exports = BookingFinancials;
