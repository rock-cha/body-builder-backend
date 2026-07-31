import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  truckType: { type: String, required: true },
  bodyType: { type: String },
  city: { type: String },
  message: { type: String }
}, { timestamps: true }); 

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;