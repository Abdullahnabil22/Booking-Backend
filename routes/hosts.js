const express = require("express");

const router = express.Router();

const {
  saveHostsbyOwnerId,
  getAllhosts,
  deleteHostById,
  patchHostById,
  getHostByOwnerId,
  getHostById,

} = require("../controllers/hosts");

const { auth, restrictTo } = require("../middlewares/auth");

router.post("/:id", saveHostsbyOwnerId);

router.get(
  "/",
  // auth, restrictTo("admin", "user"),
  getAllhosts
);

router.delete("/:id", deleteHostById);

router.patch("/:id", patchHostById);
router.get("/:id",getHostById)

router.get(
  "/owner/:id",
  // auth, restrictTo("admin", "owner"),
  getHostByOwnerId
);




module.exports = router;
