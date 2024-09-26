const mongoose = require("mongoose");

let HostSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "owner is required"],
  },
  name: {
    en: {
      type: String,
      required: [true, "user name is required"],
      minLength: 3,
      maxLength: 50,
    },
    ar: {
      type: String,
      required: [true, "user name is required"],
      minLength: 3,
      maxLength: 50,
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
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  location: {
    Address: {
      en: {
        type: String,
        required: [true, "address is required"],
      },
      ar: {
        type: String,
        required: [true, "address is required"],
      },
    },
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
  },
  facilities: {
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
    Breakfast: {
      type: Boolean,
      default: false,
    },
    Dinner: {
      type: Boolean,
      default: false,
    },
    Lunch: {
      type: Boolean,
      default: false,
    },
    RoomService: {
      type: Boolean,
      default: false,
    },
    AirportShuttle: {
      type: Boolean,
      default: false,
    },
    Babysitting: {
      type: Boolean,
      default: false,
    },
    Laundry: {
      type: Boolean,
      default: false,
    },
    DryCleaning: {
      type: Boolean,
      default: false,
    },
    Ironing: {
      type: Boolean,
      default: false,
    },
    Beachfront: {
      type: Boolean,
      default: false,
    },
    FreeParking: {
      type: Boolean,
      default: false,
    },
    Spa: {
      type: Boolean,
      default: false,
    },
    Sauna: {
      type: Boolean,
      default: false,
    },
    SteamRoom: {
      type: Boolean,
      default: false,
    },
    HotTub: {
      type: Boolean,
      default: false,
    },
    FitnessCenter: {
      type: Boolean,
      default: false,
    },
    Yoga: {
      type: Boolean,
      default: false,
    },
    Massage: {
      type: Boolean,
      default: false,
    },
    Pool: {
      type: Boolean,
      default: false,
    },
    Garden: {
      type: Boolean,
      default: false,
    },
    Terrace: {
      type: Boolean,
      default: false,
    },
  },
  AverageRating: {
    type: Number,
    default: 0,
  },
  ReviewCount: {
    type: Number,
    default: 0,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("host", HostSchema);
