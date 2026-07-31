// Controllers/quoteConrollers.js
import Quote from "../models/Quote.js";

export const sendQuote = async (req, res) => {
  try {
    const { name, email, phone, company, truckType, bodyType, city, message } = req.body;

    if (!name || !email || !phone || !truckType) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Name, Email, Phone, Truck Type).",
      });
    }

    const newQuote = await Quote.create({
      name,
      email,
      phone,
      company: company || "",
      truckType,
      bodyType: bodyType || "",
      city: city || "",
      message: message || "",
    });

    // 💡 201 Created Status அனுப்பினால் Front-end 304 வராமல் Success Alert காட்டும்
    return res.status(201).json({
      success: true,
      message: "Quote request submitted successfully!",
      data: newQuote,
    });

  } catch (err) {
    console.error("🚨 Quote Controller Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};