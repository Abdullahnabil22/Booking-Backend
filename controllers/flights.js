const mongoose = require("mongoose");
const Flight = require("../models/flights");

// Route to get all flights
let getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Route to get a specific flight by ID
let flightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight == null) {
      return res.status(404).json({ message: "Cannot find flight" });
    }
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Route to post a new flight
let postFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const newFlight = await flight.save();
    res.status(201).json(newFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Route to update a flight
let updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight == null) {
      return res.status(404).json({ message: "Cannot find flight" });
    }

    if (req.body.airline != null) {
      flight.airline = req.body.airline;
    }
    if (req.body.departure != null) {
      flight.departure = req.body.departure;
    }
    if (req.body.arrival != null) {
      flight.arrival = req.body.arrival;
    }
    if (req.body.duration != null) {
      flight.duration = req.body.duration;
    }
    if (req.body.stops != null) {
      flight.stops = req.body.stops;
    }
    if (req.body.price != null) {
      flight.price = req.body.price;
    }
    if (req.body.currency != null) {
      flight.currency = req.body.currency;
    }
    if (req.body.booking_link != null) {
      flight.booking_link = req.body.booking_link;
    }
    if (req.body.cabin_class != null) {
      flight.cabin_class = req.body.cabin_class;
    }
    if (req.body.baggage_info != null) {
      flight.baggage_info = req.body.baggage_info;
    }

    const updatedFlight = await flight.save();
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Route to delete a flight
let deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight == null) {
      return res.status(404).json({ message: "Cannot find flight" });
    }

    await Flight.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted flight" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFlights,
  flightById,
  postFlight,
  updateFlight,
  deleteFlight,
};
