const router = require("express").Router();
const {
  createRoomType,
  getRoomTypes,
  updateRoomType,
  deleteRoomType,
} = require("../controllers/rooms");

// CREATE
router.post("/", createRoomType);

// GET ALL
router.get("/", getRoomTypes);

// UPDATE
router.patch("/:id", updateRoomType);

// DELETE
router.delete("/:id", deleteRoomType);

module.exports = router;
