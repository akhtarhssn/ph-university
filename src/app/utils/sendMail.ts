import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import config from '../config';

export const sendMail = async (
  to: string,
  data: { userName?: string; resetLink: string },
) => {
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

  const templatePath = path.join(
    process.cwd(),
    'src/app/templates/emails/forgot-password.ejs',
  );

  const html = await ejs.renderFile(templatePath, {
    userName: data.userName || 'there',
    resetLink: data.resetLink,
    year: new Date().getFullYear(),
    unsubscribeLink: `https://yourdomain.com/unsubscribe?email=${encodeURIComponent(to)}`,
  });

  // function
  await transporter.sendMail({
    from: `"PH University" <${config.company_email}>`, // sender address
    to, // list of receivers
    subject: 'Password Reset Request, This link is valid for 10 minutes', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
