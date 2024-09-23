const mongoose = require("mongoose");

let HostSchema = mongoose.Schema({
  hostname: {
    type: String,
    required: [true, "user name is required"],
    unique: [true, "user name must be unique"],
    minLength: 3,
    maxLength: 16,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  type: {
    type: String,
    // enum:['Hotel','Resort','Apartment','Cottage','Villa'],
  },
  location: {
    Address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  // images:[

  // ],
  details: {
    type: String,
  },
  rating: {
    type: Number,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("host", HostSchema);
