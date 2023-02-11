import nodemailer from "nodemailer";

const email = process.env.MAILER_EMAIL;
const pass = process.env.EMAIL_PASS_MAILER;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass
  },
});

