const router = require("express").Router();
const {
  createRoomType,
  getRoomTypes,
  updateRoomType,
  deleteRoomType,
  getRoomTypeById,
  getRoomTypeByHostId,
  getRoomTypeByApartmentId,
  createRoomTypeByHotelId,
} = require("../controllers/rooms");
const { auth, restrictTo } = require("../middlewares/auth");

router.post("/", auth, restrictTo("admin", "owner"), createRoomType);

router.get(
  "/",
  // auth, restrictTo("admin", "user", "owner"),
  getRoomTypes
);

router.get(
  "/:id",
  // auth, restrictTo("admin", "user", "owner"),
  getRoomTypeById
);

router.post("/hotel/:id", createRoomTypeByHotelId);

router.get("/hotel/:id", getRoomTypeByHostId);

router.get(
  "/apartment/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  getRoomTypeByApartmentId
);

router.patch("/:id", auth, restrictTo("admin", "owner"), updateRoomType);

router.delete("/:id", auth, restrictTo("admin", "owner"), deleteRoomType);

module.exports = router;
