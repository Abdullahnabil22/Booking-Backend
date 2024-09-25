// const mongoose = require("mongoose");

// const RoomTypeSchema = new mongoose.Schema({
//   Type: String,
//   images: [String],
//   available: Boolean,
//   hotelID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Hotel",
//   },
// });

// module.exports = mongoose.model("RoomType", RoomTypeSchema);


const RoomTypeSchema = require("mongoose");

const RoomSchema = new mongoose.Schema({
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
  roomType: {
    type: {
      en: {
        type: String,
        required: [true, "Room type (English) is required"],
        enum: ["Single", "Double", "Suite", "Studio", "Deluxe", "Penthouse"], 
      },
      ar: {
        type: String,
        required: [true, "Room type (Arabic) is required"],
        enum: ["مفرد", "مزدوج", "جناح", "استوديو", "ديلوكس", "بنتهاوس"],
      },
    },
    images: [String], 
    available: {
      type: Boolean,
      default: true,
    },
  },
  numberOfRooms: {
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
    required: [true, "Hotel ID is required"],
  },
  apartmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: [true, "Apartment ID is required"],
  },
});

module.exports = mongoose.model("RoomType", RoomTypeSchema);
