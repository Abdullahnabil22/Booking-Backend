const mongoose = require("mongoose");

const RoomTypeSchema = new mongoose.Schema({
  name: {
    en: {
      type: String,
      required: [true, "Name is required"],
    },
    ar: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  description: {
    en: {
      type: String,
      required: [true, "Description is required"],
    },
    ar: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  subDescription: {
    en: {
      type: String,
      required: [true, "Sub description is required"],
      maxLength: [100, "Sub description must be less than 100 characters"],
    },
    ar: {
      type: String,
      required: [true, "Sub description is required"],
      maxLength: [100, "Sub description must be less than 100 characters"],
    },
  },
  roomType: {
    type: {
      en: {
        type: String,
        required: [true, "Room type (English) is required"],
        enum: [
          "Deluxe Single",
          "Deluxe Double",
          -"Standard Single",
          "Standard Double",
        ],
      },
      ar: {
        type: String,
        required: [true, "Room type (Arabic) is required"],
        enum: [" ديلوكس مفرد", "ديلوكس مزدوج", "مفرد", "مزدوج"],
      },
    },
    images: [String],
    available: {
      type: Boolean,
      default: true,
    },
  },
  beds: {
    KingBed: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
    QueenBed: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
    TwinBed: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
    SofaBed: {
      type: Number,
      required: [true, "Number of beds is required"],
    },
  },
  numberOfRoomsWithThisType: {
    type: Number,
    required: [true, "Number of rooms is required"],
  },
  benefits: {
    wifi: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    breakfastIncluded: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    poolAccess: { type: Boolean, default: false },
    gymAccess: { type: Boolean, default: false },
    roomService: { type: Boolean, default: true },
    spaAccess: { type: Boolean, default: false },
    laundryService: { type: Boolean, default: false },
    minibar: { type: Boolean, default: false },
    oceanView: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    safeBox: { type: Boolean, default: false },
    hairDryer: { type: Boolean, default: false },
    teaCoffeeMaker: { type: Boolean, default: false },
    freeToiletries: { type: Boolean, default: false },
    dailyHousekeeping: { type: Boolean, default: false },
    iron: { type: Boolean, default: false },
  },
  available: {
    type: Boolean,
    default: true,
  },
  hotelID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  apartmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
  },
});

module.exports = mongoose.model("RoomType", RoomTypeSchema);
