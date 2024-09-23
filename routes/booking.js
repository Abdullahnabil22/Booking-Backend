const router = require("express").Router();
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");

// GET ALL
router.get("/", getBookings);

// CREATE
router.post("/", createBooking);

// UPDATE
router.patch("/:id", updateBooking);

// DELETE
router.delete("/:id", deleteBooking);

module.exports = router;
