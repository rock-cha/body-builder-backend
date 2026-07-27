import Quote from "../models/Quote.js";
import nodemailer from "nodemailer";

export const sendQuote = async (req, res) => {
  try {
    const { name, email, phone, company, truckType, bodyType, city, message } = req.body;

    const quote = await Quote.create({
      name,
      email,
      phone,
      company,
      truckType,
      bodyType,
      city,
      message,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `🚨 New Truck Body Enquiry from ${quote.name}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee;">
        <h2 style="color: #0B2341;">New Customer Enquiry</h2>
        <hr />
        <p><b>Name:</b> ${quote.name}</p>
        <p><b>Email:</b> ${quote.email}</p>
        <p><b>Phone:</b> ${quote.phone}</p>
        <p><b>Company:</b> ${quote.company || 'Not Provided'}</p>
        <p><b>Truck Brand:</b> ${quote.truckType}</p>
        <p><b>Body Type:</b> ${quote.bodyType || 'Not Provided'}</p>
        <p><b>City:</b> ${quote.city || 'Not Provided'}</p>
        <p><b>Message / Requirements:</b></p>
        <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #0B2341;">${quote.message || 'No additional message'}</p>
      </div>
      `,
    });

    return res.json({
      success: true,
      message: "Quote Sent and Saved Successfully",
    });
  } catch (err) {
    console.error("🚨 Backend Error Details:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};