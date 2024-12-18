const Review = require("../models/review");

// Route to get all reviews for a specific hotel
let hostReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ hotelId: req.params.id }).populate(
      "userId"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Route to get all reviews by a specific user
let userReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user_id: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
let apartmentReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ apartment_id: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Route to post a new review
// let newReview = async (req, res) => {
//   try {
//     const review = new Review(req.body);
//     const newReview = await review.save();
//     res.status(201).json(newReview);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

let newReview = async (req, res) => {
  const { reviewId } = req.params;
  const { message } = req.body;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).send("Review not found");
    }

    review.replies.push({ from: "Hotel Managemen", message });
    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
// Route to post a review by hotel id
let hotelReview = async (req, res) => {
  let hotelId = req.params.id;
  try {
    const review = new Review({ ...req.body, hotelId });
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

let updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: "Cannot find review" });
    }

    if (req.body.rating != null) {
      review.rating = req.body.rating;
    }

    if (req.body.comment != null) {
      review.comment = req.body.comment;
    }

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Route to delete a review
let deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: "Cannot find review" });
    }

    await review.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted review" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  hostReviews,
  userReviews,
  newReview,
  updateReview,
  deleteReview,
  apartmentReviews,
  hotelReview,
};
