const mongoose = require("mongoose");
const ApartmentModel = require("../models/apartments");

let getAllApartments = async (req, res) => {
  try {
    const apartments = await ApartmentModel.find();
    res.status(200).json(apartments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getApartmentById = async (req, res) => {
  try {
    const apartment = await ApartmentModel.findById(req.params.id);
    if (apartment == null) {
      return res.status(404).json({ message: "Cannot find apartment" });
    }
    res.status(200).json(apartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let createApartment = async (req, res) => {
  try {
    const apartment = new ApartmentModel(req.body);
    const newApartment = await apartment.save();
    res.status(201).json(newApartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let updateApartment = async (req, res) => {
  try {
    const apartment = await ApartmentModel.findByIdAndUpdate(
      // Updated to use ApartmentModel
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (apartment == null) {
      return res.status(404).json({ message: "Cannot find apartment" });
    }
    res.status(200).json(apartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let deleteApartment = async (req, res) => {
  try {
    const apartment = await ApartmentModel.findByIdAndDelete(req.params.id);
    if (apartment == null) {
      return res.status(404).json({ message: "Cannot find apartment" });
    }
    res.status(200).json({ message: "Apartment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
};
