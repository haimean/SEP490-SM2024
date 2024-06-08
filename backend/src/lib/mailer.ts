import nodemailer, { SentMessageInfo } from 'nodemailer';
import mailConfig from '../config/mail.config';

interface SendMailOptions {
  to: string;
  subject: string;
  htmlContent: string;
}

export const sendMail = ({
  to,
  subject,
  htmlContent,
}: SendMailOptions): Promise<SentMessageInfo> => {
  const transport = nodemailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });

  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return transport.sendMail(options);
};
