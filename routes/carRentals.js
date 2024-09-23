const router = require("express").Router();
const {
  createCarRental,
  getCarRentals,
  updateCarRental,
  deleteCarRental,
} = require("../controllers/carRentals");

// CREATE
router.post("/", createCarRental);

// GET ALL
router.get("/", getCarRentals);

// UPDATE
router.patch("/:id", updateCarRental);

// DELETE
router.delete("/:id", deleteCarRental);

module.exports = router;
