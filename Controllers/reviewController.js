import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { name, phone, truckModel, rating, review } = req.body;

    if (!name || !phone || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const newReview = await Review.create({
      name,
      phone,
      truckModel,
      rating,
      review,
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: newReview,
    });
  } catch (err) {
    console.error("🚨 Review Controller Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error("🚨 Fetch Reviews Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};