const router = require("express").Router();
const {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  createAmenityByHotelId,
  getAmenityByHotelId,
} = require("../controllers/amenities");
const { auth, restrictTo } = require("../middlewares/auth");

router.get(
  "/",
  // auth, restrictTo("admin", "user", "owner"),
  getAllAmenities
);
router.get("/:id", auth, restrictTo("admin", "user", "owner"), getAmenityById);
router.post("/", auth, restrictTo("admin", "owner"), createAmenity);
router.post("/hotel/:id", createAmenityByHotelId);
router.get("/hotel/:id", getAmenityByHotelId);
router.patch("/:id", auth, restrictTo("admin", "owner"), updateAmenity);
router.delete("/:id", auth, restrictTo("admin", "owner"), deleteAmenity);

module.exports = router;
