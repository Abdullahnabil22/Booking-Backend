const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  device: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visitor", VisitorSchema);
