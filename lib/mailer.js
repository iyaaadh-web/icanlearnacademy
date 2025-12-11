const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  } : undefined
});

async function notifySignup(student){
  const to = process.env.NOTIFY_EMAIL || 'sales@fasmala.com';
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER || 'no-reply@icanlearn.test';
  const html = `<h3>New Student Signup</h3><p>Name: ${student.name}</p><p>Email: ${student.email}</p>`;
  try {
    await transporter.sendMail({ from, to, subject: 'New Student Registration', html });
  }catch(e){
    console.error('Mailer error', e && e.message);
  }
}

module.exports = { notifySignup };
