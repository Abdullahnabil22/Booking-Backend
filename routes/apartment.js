const router = require("express").Router();
const {
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment,
  getApartmentByHostId,
  createApartmentByOwnerId,
} = require("../controllers/apartments");
const { auth, restrictTo } = require("../middlewares/auth");

router.get(
  "/",
  // auth, restrictTo("admin", "user", "owner"),
  getAllApartments
);
router.get(
  "/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  getApartmentById
);
router.get(
  "/owner/:id",
  auth,
  restrictTo("admin", "owner"),
  getApartmentByHostId
);
router.post("/", auth, restrictTo("admin", "owner"), createApartment);
router.post(
  "/:id",
  // auth,
  // restrictTo("admin", "owner"),
  createApartmentByOwnerId
);
router.patch("/:id", auth, restrictTo("admin", "owner"), updateApartment);
router.delete("/:id", auth, restrictTo("admin", "owner"), deleteApartment);

module.exports = router;
