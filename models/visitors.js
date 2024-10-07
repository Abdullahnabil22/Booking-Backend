const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  visitorCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
