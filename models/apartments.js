const mongoose = require("mongoose");

// Define the schema
let ApartmentSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      en: {
        type: String,
        required: [true, "name is required"],
      },
      ar: {
        type: String,
        required: [true, "name is required"],
      },
    },
    description: {
      en: {
        type: String,
        required: [true, "description is required"],
      },
      ar: {
        type: String,
        required: [true, "description is required"],
      },
    },
    location: {
      city: {
        en: {
          type: String,
          required: [true, "city is required"],
        },
        ar: {
          type: String,
          required: [true, "city is required"],
        },
      },
      country: {
        en: {
          type: String,
          required: [true, "country is required"],
        },
        ar: {
          type: String,
          required: [true, "country is required"],
        },
      },
      address: {
        en: {
          type: String,
          required: [true, "address is required"],
        },
        ar: {
          type: String,
          required: [true, "address is required"],
        },
      },
    },
    images: {
      type: Array,
      required: [true, "images is required"],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    Rooms: {
      Bedrooms: {
        type: Number,
        required: [true, "Bedrooms is required"],
      },
      Bathrooms: {
        type: Number,
        required: [true, "Bathrooms is required"],
      },
      LivingRooms: {
        type: Number,
        required: [true, "LivingRooms is required"],
      },
      Kitchen: {
        type: Boolean,
        required: [true, "Kitchen is required"],
      },
      Balcony: {
        type: Boolean,
        required: [true, "Balcony is required"],
      },
    },

    CheckInTime: {
      type: String,
      required: [true, "CheckInTime is required"],
    },
    CheckOutTime: {
      type: String,
      required: [true, "CheckOutTime is required"],
    },
    PricePerNight: {
      type: Number,
      required: [true, "price is required"],
    },
    HouseRules: {
      NoSmoking: {
        type: Boolean,
        required: [true, "NoSmoking is required"],
      },
      NoPets: {
        type: Boolean,
        required: [true, "NoPets is required"],
      },
      NoParties: {
        type: Boolean,
        required: [true, "NoParties is required"],
      },
    },
    Cancellation: {
      Policy: {
        en: String,
        ar: String,
      },
      Refundable: Boolean,
      DeadlineDays: Number,
    },
    Facilities: {
      WiFi: Boolean,
      AirConditioning: Boolean,
      Parking: Boolean,
      SwimmingPool: Boolean,
      Gym: Boolean,
    },
    AverageRating: Number,
    ReviewCount: Number,
    CreatedAt: Date,
    UpdatedAt: Date,
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "apartments" }
);

const Apartment = mongoose.model("Apartment", ApartmentSchema);

module.exports = Apartment;
