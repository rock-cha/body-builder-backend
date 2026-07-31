import nodemailer from "nodemailer";

export const sendQuote = async (req, res) => {
  try {
    const { name, email, phone, company, truckType, bodyType, city, message } = req.body;

    // 1. Validation Check
    if (!name || !email || !phone || !truckType) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Name, Email, Phone, Truck Type).",
      });
    }

    // 2. Nodemailer Setup (Using .env variables)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,      
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 3. Email Content Configuration
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL, // உங்கள் மின்னஞ்சல் முகவரிக்கே அனுப்பப்படும்
      subject: `🚚 New Direct Quote Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #1e3a8a;">New Truck Quote Details</h2>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Truck Brand:</strong> ${truckType}</p>
          <p><strong>Body Type:</strong> ${bodyType || "N/A"}</p>
          <p><strong>City:</strong> ${city || "N/A"}</p>
          <p><strong>Message:</strong> ${message || "N/A"}</p>
        </div>
      `,
    };

    // 4. Send Email Directly
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Quote request email sent successfully!",
    });

  } catch (err) {
    console.error("🚨 Direct Quote Mail Error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email. Please check server credentials.",
    });
  }
};