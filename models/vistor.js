const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  }
});

module.exports = mongoose.model("Visitor", visitorSchema);
