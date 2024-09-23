const mongoose = require("mongoose");

const RoomTypeSchema = new mongoose.Schema({
  Type: String,
  images: [String],
  available: Boolean,
  hotelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
});

module.exports = mongoose.model("RoomType", RoomTypeSchema);
