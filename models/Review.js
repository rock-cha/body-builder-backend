import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    truckModel: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;