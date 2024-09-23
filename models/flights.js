const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    // required: true
  },
  departure: {
    airport: {
      type: String,
    //   required: true
    },
    city: {
      type: String,
    //   required: true
    },
    time: {
      type: Date,
    //   required: true
    }
  },
  arrival: {
    airport: {
      type: String,
    //   required: true
    },
    city: {
      type: String,
    //   required: true
    },
    time: {
      type: Date,
    //   required: true
    }
  },
  duration: {
    type: String,
    // required: true
  },
  stops: {
    type: Number,
    // required: true
  },
  price: {
    type: Number,
    // required: true
  },
  currency: {
    type: String,
    // required: true
  },
  booking_link: {
    type: String,
    // required: true
  },
  cabin_class: {
    type: String,
    // required: true
  },
  baggage_info: {
    carry_on: {
      type: String,
    //   required: true
    },
    checked: {
      type: String,
    //   required: true
    }
  }
});

module.exports = mongoose.model('Flight', flightSchema);
