// mailer.js
import { createTransport } from 'nodemailer';

// Create a transporter
const transporter = createTransport({
  service: 'Gmail', 
  port:465,
  secure:true,
  auth: {
    user: 'anilkushwaha1297@gmail.com', 
    pass: 'zygr mzte cfjj imef',
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'amitkushwaha72024@gmail.com',
    to: 'anilkushwaha1297@gmail.com',
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
