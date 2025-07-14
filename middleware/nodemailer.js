// mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hemanthgowdasp9@gmail.com',
    pass: 'zgpm bnyt vned potr'  // Use App Password if 2FA is enabled
  }
});

export const sendReminderEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'Your Daily Day Helper',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${to}`);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};
