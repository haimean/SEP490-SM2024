import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
  // config mail server
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

type SendMailCallback = (
  error: Error | null,
  info: nodemailer.SentMessageInfo
) => void;

const sendEmail = async (
  email: string,
  text: string,
  subject: string,
  callback: SendMailCallback
): Promise<void> => {
  const mainOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: email,
    subject: subject,
    html: text,
  };
  await transporter.sendMail(mainOptions, callback);
};

export default sendEmail;
