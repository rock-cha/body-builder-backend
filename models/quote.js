
import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  truckType: { type: String, required: true },
  bodyType: { type: String }, // Pudhidhaaga serkkapattadhu
  city: { type: String },     // Pudhidhaaga serkkapattadhu
  message: { type: String }
}, { timestamps: true }); 

const Quote = mongoose.model("Quote", quoteSchema);
export default quote;