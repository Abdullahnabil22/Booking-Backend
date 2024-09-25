const router = require("express").Router();
const {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
} = require("../controllers/apartments");

router.get("/", getAllApartments);
router.get("/:id", getApartmentById);
router.post("/", createApartment);
router.patch("/:id", updateApartment);
router.delete("/:id", deleteApartment);

module.exports = router;
