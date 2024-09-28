const mongoose = require("mongoose");

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
    subDescription: {
      en: {
        type: String,
        required: [true, "subDescription is required"],
      },
      ar: {
        type: String,
        required: [true, "subDescription is required"],
      },
    },
    phone: {
      type: Number,
      required: [true, "phone is required"],
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
      CheckInTime: {
        type: String,
        required: [true, "CheckInTime is required"],
      },
      CheckOutTime: {
        type: String,
        required: [true, "CheckOutTime is required"],
      },
      Cancellation: {
        Policy: {
          en: String,
          ar: String,
        },
        Refundable: Boolean,
        DeadlineDays: Number,
      },
      PricePerNight: {
        type: Number,
        required: [true, "price is required"],
      },
      Insurance: {
        price: Number,
        coverage: String,
      },
    },
    Facilities: {
      WiFi: {
        type: Boolean,
        default: false,
      },
      AirConditioning: {
        type: Boolean,
        default: false,
      },
      Parking: {
        type: Boolean,
        default: false,
      },
      SwimmingPool: {
        type: Boolean,
        default: false,
      },
      Gym: {
        type: Boolean,
        default: false,
      },
      WashingMachine: {
        type: Boolean,
        default: false,
      },
      Dryer: {
        type: Boolean,
        default: false,
      },
      Iron: {
        type: Boolean,
        default: false,
      },
      HairDryer: {
        type: Boolean,
        default: false,
      },
      IroningBoard: {
        type: Boolean,
        default: false,
      },
      TV: {
        type: Boolean,
        default: false,
      },
      CableTV: {
        type: Boolean,
        default: false,
      },
      DVDPlayer: {
        type: Boolean,
        default: false,
      },
      CDPlayer: {
        type: Boolean,
        default: false,
      },
      Radio: {
        type: Boolean,
        default: false,
      },
      AlarmClock: {
        type: Boolean,
        default: false,
      },
      Microwave: {
        type: Boolean,
        default: false,
      },
      Refrigerator: {
        type: Boolean,
        default: false,
      },
      Oven: {
        type: Boolean,
        default: false,
      },
    },
    AverageRating: Number,
    ReviewCount: Number,
    CreatedAt: Date,
    UpdatedAt: Date,
    approved: {
      type: Boolean,
      default: false,
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  { collection: "apartments" }
);

const Apartment = mongoose.model("Apartment", ApartmentSchema);

module.exports = Apartment;
