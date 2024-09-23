const CarRental = require("../models/carRentals");

// CREATE
exports.createCarRental = async (req, res) => {
  try {
    const rental = new CarRental(req.body);
    await rental.save();
    res.status(201).send(rental);
  } catch (error) {
    res.status(400).send(error);
  }
};

// GET ALL
exports.getCarRentals = async (req, res) => {
  try {
    const carRentals = await CarRental.find();
    res.status(200).json(carRentals);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
exports.updateCarRental = async (req, res) => {
  try {
    const updatedCarRental = await CarRental.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCarRental);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteCarRental = async (req, res) => {
  try {
    await CarRental.findByIdAndDelete(req.params.id);
    res.status(200).json("Car rental has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
