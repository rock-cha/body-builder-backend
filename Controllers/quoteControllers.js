import nodemailer from 'nodemailer';

export const sendQuoteEmail = async (req, res) => {
  try {
    const { name, company, phone, email, truckType, bodyType, city, message } = req.body;

    // 1. Basic Validation Check
    if (!name || !email || !phone || !truckType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (Name, Email, Phone, Truck Brand).'
      });
    }

    // 2. Nodemailer Transporter creation (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 3. Email Template Design
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email, // Reply கொடுத்தால் வாடிக்கையாளரின் மெயிலுக்கு செல்லும்
      to: process.env.EMAIL_USER, // மெயில் பெற வேண்டிய உங்களது ஜிமெயில்
      subject: `🚚 New Quote Request from ${name} (${truckType})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">New Truck Body Fabrication Quote Request</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 35%;">Customer Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Company Name:</td>
              <td style="padding: 8px;">${company || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Email Address:</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Truck Brand:</td>
              <td style="padding: 8px; color: #1e3a8a; font-weight: bold;">${truckType}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Body Type:</td>
              <td style="padding: 8px;">${bodyType || 'Not Specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">City / Location:</td>
              <td style="padding: 8px;">${city || 'N/A'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-left: 4px solid #1e3a8a; border-radius: 4px;">
            <h4 style="margin: 0 0 5px 0; color: #1e3a8a;">Additional Message / Requirements:</h4>
            <p style="margin: 0; white-space: pre-line;">${message || 'No additional message provided.'}</p>
          </div>

          <p style="font-size: 12px; color: #777; margin-top: 25px; text-align: center;">
            This email was automatically generated from your website's Get Quote form.
          </p>
        </div>
      `
    };

    // 4. Send Email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Quote Request Email Sent Successfully!'
    });

  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send quote request. Please try again later.'
    });
  }
};