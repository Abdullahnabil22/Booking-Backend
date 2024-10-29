const mongoose = require("mongoose");

const PayoutRequestSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "PAID", "REJECTED", "IN_PROGRESS"],
      default: "PENDING",
    },
    requested_date: {
      type: Date,
      default: Date.now,
    },
    payment_date: Date,
    payment_method: {
      type: String,
      enum: ["PayPal", "Bank Transfer"],
      default: "PayPal",
    },
    payment_reference: String,
    paypalEmail: String,
  },
  { timestamps: true }
);
const PayoutRequest = mongoose.model("PayoutRequest", PayoutRequestSchema);

module.exports = PayoutRequest;
