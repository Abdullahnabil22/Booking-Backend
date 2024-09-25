const router = require("express").Router();
const {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenities");

router.get("/", getAllAmenities);
router.get("/:id", getAmenityById);
router.post("/", createAmenity);
router.patch("/:id", updateAmenity);
router.delete("/:id", deleteAmenity);

module.exports = router;
