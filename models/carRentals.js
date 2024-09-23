const mongoose = require("mongoose");

const CarRentalSchema = new mongoose.Schema(
  {
    car_name: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    supplier_rating: {
      type: Number,
      required: true,
    },
    car_specs: {
      seats: {
        type: Number,
        required: true,
      },
      large_bags: {
        type: Number,
        required: true,
      },
      small_bags: {
        type: Number,
        required: true,
      },
      transmission: {
        type: String,
        required: true,
      },
      air_conditioning: {
        type: Boolean,
        required: true,
      },
      doors: {
        type: Number,
        required: true,
      },
      mileage: {
        type: String,
        required: true,
      },
    },
    location: {
      airport: {
        type: String,
        required: true,
      },
      terminal: {
        type: String,
        required: true,
      },
      pickup_type: {
        type: String,
        required: true,
      },
    },
    pricing: {
      price_per_day: {
        type: Number,
        required: true,
      },
      total_price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      free_cancellation: {
        type: Boolean,
        required: true,
      },
    },
    availability: {
      start_date: {
        type: Date,
        required: true,
      },
      end_date: {
        type: Date,
        required: true,
      },
    },
    reviews: {
      total_reviews: {
        type: Number,
        required: true,
      },
      average_rating: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarRental", CarRentalSchema);
