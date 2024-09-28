const express = require("express");

const router = express.Router();

const {
  saveHosts,
  getAllhosts,
  deleteHostById,
  patchHostById,
  getHostByOwnerId,
} = require("../controllers/hosts");

const { auth, restrictTo } = require("../middlewares/auth");

router.post("/", auth, restrictTo("admin", "owner"), saveHosts);

router.get(
  "/",
  // auth, restrictTo("admin", "user"),
  getAllhosts
);

router.delete("/:id", auth, restrictTo("admin", "owner"), deleteHostById);

router.patch("/:id", auth, restrictTo("owner"), patchHostById);

router.get("/owner/:id", auth, restrictTo("admin", "owner"), getHostByOwnerId);
module.exports = router;
