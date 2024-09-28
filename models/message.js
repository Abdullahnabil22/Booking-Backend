const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Host",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    apartment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
    },
    content: {
      type: String,
      required: true,
    },
    timestamps: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
    replies: [
      {
        type: String,
        default: "",
      },
    ],
  },
  { Collection: "message" }
);

module.exports = mongoose.model("Message", messageSchema);
