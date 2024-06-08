interface MailConfig {
  MAILER: string;
  HOST: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  ENCRYPTION: string;
  FROM_ADDRESS: string;
  FROM_NAME: string;
}

const mailConfig: MailConfig = {
  MAILER: process.env.MAIL_MAILER as string,
  HOST: process.env.MAIL_HOST as string,
  PORT: Number(process.env.MAIL_PORT),
  USERNAME: process.env.MAIL_USERNAME as string,
  PASSWORD: process.env.MAIL_PASSWORD as string,
  ENCRYPTION: process.env.MAIL_ENCRYPTION as string,
  FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS as string,
  FROM_NAME: process.env.MAIL_FROM_NAME as string,
};

export default mailConfig;
