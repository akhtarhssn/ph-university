import nodemailer from 'nodemailer';
import config from '../config';

export const sendMail = async (to: string, html: string) => {
  console.log(to, html);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'hasnahena1420@gmail.com',
      pass: 'zyec rwsx jytl tmpd',
    },
  });

  // function
  await transporter.sendMail({
    from: '"PH University " <support@ph-university.com>', // sender address
    to, // list of receivers
    subject: 'Password Reset Request', // Subject line
    text: 'Below is your password reset link. This link is valid for 10 minutes', // plain text body
    html, // html body
  });
};
