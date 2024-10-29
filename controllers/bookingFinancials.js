const BookingFinancials = require("../models/bookingFinancials");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const bookingFinancials = await BookingFinancials.find();
  res.json(bookingFinancials);
});

module.exports = router;
