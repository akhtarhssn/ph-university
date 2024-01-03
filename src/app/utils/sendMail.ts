import nodemailer from 'nodemailer';
import config from '../config';

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.mail_sender,
      pass: config.smtp_pass,
    },
  });

  // function
  await transporter.sendMail({
    from: '"PH University " <support@ph-university.com>', // sender address
    to, // list of receivers
    subject: 'Password Reset Request, This link is valid for 10 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
