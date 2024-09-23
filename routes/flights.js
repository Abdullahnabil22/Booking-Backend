const express = require("express");
const router = express.Router();
let {
  getAllFlights,
  flightById,
  postFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flights");

// Route to get all flights
router.get("/", getAllFlights);
// Route to get a specific flight by ID
router.get("/:id", flightById);
// Route to add a new flight
router.post("/", postFlight);
// Route to update a flight by ID
router.patch("/:id", updateFlight);
// Route to delete a flight
router.delete("/:id", deleteFlight);

module.exports = router;
