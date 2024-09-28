const express = require("express");
const router = express.Router();
let {
  hostReviews,
  userReviews,
  newReview,
  updateReview,
  deleteReview,
  apartmentReviews,
} = require("../controllers/review");
const { auth, restrictTo } = require("../middlewares/auth");

router.get(
  "/hotel/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  hostReviews
);

router.get(
  "/user/:id",
  // auth,
  // restrictTo("admin", "user", "owner"),
  userReviews
);

router.get(
  "/apartment/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  apartmentReviews
);

router.post("/", auth, restrictTo("admin", "user", "owner"), newReview);

router.patch("/:id", auth, restrictTo("admin", "user", "owner"), updateReview);

router.delete("/:id", auth, restrictTo("admin", "user", "owner"), deleteReview);

module.exports = router;
