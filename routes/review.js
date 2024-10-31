const express = require("express");
const router = express.Router();
let {
  hostReviews,
  userReviews,
  newReview,
  updateReview,
  deleteReview,
  apartmentReviews,
  hotelReview,
} = require("../controllers/review");
const { auth, restrictTo } = require("../middlewares/auth");

router.get("/hotel/:id", hostReviews);

router.get("/user/:id", userReviews);

router.get(
  "/apartment/:id",
  auth,
  restrictTo("admin", "user", "owner"),
  apartmentReviews
);

router.post("/hotel/:id", hotelReview);
router.post("/", auth, restrictTo("admin", "user", "owner"), newReview);

router.post("/:reviewId/replies", newReview);

router.patch("/:id", auth, restrictTo("admin", "user", "owner"), updateReview);

router.delete("/:id", auth, restrictTo("admin", "user", "owner"), deleteReview);

module.exports = router;
