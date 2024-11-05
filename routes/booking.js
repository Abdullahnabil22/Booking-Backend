const router = require("express").Router();
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getBookingByUserId,
  getBookingByHostId,
  getBookingByApartmentId,
} = require("../controllers/bookings");
const { auth, restrictTo } = require("../middlewares/auth");

router.get("/", getBookings);

router.post("/", createBooking);

router.patch("/:id", auth, restrictTo("admin", "user"), updateBooking);

router.delete("/:id", deleteBooking);

router.get(
  "/user/:id",
  // auth,
  // restrictTo("admin", "user", "owner"),
  getBookingByUserId
);
router.get(
  "/host/:id",
  // auth,
  // restrictTo("admin", "user", "owner"),
  getBookingByHostId
);
router.get(
  "/apartment/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  getBookingByApartmentId
);

module.exports = router;
