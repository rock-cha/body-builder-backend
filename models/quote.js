import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  truckType: { type: String, required: true },
  bodyType: { type: String }, // புதிதாக சேர்க்கப்பட்டது
  city: { type: String },     // புதிதாக சேர்க்கப்பட்டது
  message: { type: String }
}, { timestamps: true }); 

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;