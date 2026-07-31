import nodemailer from "nodemailer";

export const sendQuote = async (req, res) => {
  try {
    const { name, email, phone, company, truckType, bodyType, city, message } = req.body;

    if (!name || !email || !phone || !truckType) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Name, Email, Phone, Truck Type).",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `🚚 New Direct Quote Request from ${name}`,
      html: `
        <h2>New Quote Request Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Truck Brand:</strong> ${truckType}</p>
        <p><strong>Body Type:</strong> ${bodyType || "N/A"}</p>
        <p><strong>City:</strong> ${city || "N/A"}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Quote request email sent successfully!",
    });

  } catch (err) {
    console.error("🚨 Quote Controller Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};