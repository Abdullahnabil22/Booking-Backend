const express = require("express");
const router = express.Router();
let {
  hostReviews,
  userReviews,
  newReview,
  updateReview,
  deleteReview,
} = require("../controllers/review");

// Route to get all reviews for a specific hotel
router.get("/hotel/:hotelId", hostReviews);

// Route to get all reviews by a specific user
router.get("/user/:userId", userReviews);

// Route to post a new review
router.post("/", newReview);

// Route to update a review
router.patch("/:id", updateReview);

// Route to delete a review
router.delete("/:id", deleteReview);

module.exports = router;
