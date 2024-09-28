const router = require("express").Router();
const {
  createRoomType,
  getRoomTypes,
  updateRoomType,
  deleteRoomType,
  getRoomTypeById,
  getRoomTypeByHostId,
  getRoomTypeByApartmentId,
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

router.get(
  "/host/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  getRoomTypeByHostId
);

router.get(
  "/apartment/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  getRoomTypeByApartmentId
);

router.patch("/:id", auth, restrictTo("admin", "owner"), updateRoomType);

router.delete("/:id", auth, restrictTo("admin", "owner"), deleteRoomType);

module.exports = router;
