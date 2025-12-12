// src/services/emailService.js
import nodemailer from "nodemailer";

export async function enviarAvisoCambioViaje(destinatarios, asunto, mensaje) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: `"TripBud Notifications" <${process.env.EMAIL_USER}>`,
    to: destinatarios,
    subject: asunto,
    text: mensaje,
  };

  await transporter.sendMail(mailOptions);
  console.log(" Email enviado a:", destinatarios);
}