const mongoose = require("mongoose");

const OwnerBalanceSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    current_balance: {
      type: Number,
      default: 0,
    },
    total_earned: {
      type: Number,
      default: 0,
    },
    total_paid: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const OwnerBalance = mongoose.model("OwnerBalance", OwnerBalanceSchema);

module.exports = OwnerBalance;
