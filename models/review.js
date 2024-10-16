const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: {
    en: String,
    ar: String,
  },
  replies: [
    {
      from: String,
      message: String,
    },
  ],
  categories: {
    Staff: Number,
    Location: Number,
    Facilities: Number,
    Services: Number,
    Comfort: Number,
    Cleanliness: Number,
    View: Number,
    Food: Number,
    Price: Number,
    Room: Number,
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hosts",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  apartmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
  },
});

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
