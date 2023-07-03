// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// require("dotenv").config();

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIT
// );
// oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// module.exports = async (email, subject, text) => {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "thinhb1906773@student.ctu.edu.vn",
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: process.env.ACCESS_TOKEN,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: '"Fred Foo" <thinhb1906773@student.ctu.edu.vn>',
//       to: "tranvanthinh1504@gmail.com",
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//     });
//     console.log("email sent successfully");
//     console.log(info);
//   } catch (error) {
//     console.log("email not sent!");
//     console.log(process.env.USER);

//     console.log(error);
//     return error;
//   }
// };

const { google } = require("googleapis");
const nodemailer = require("nodemailer");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIT
);
oAuth2Client.setCredentials({
  refresh_token:
    "1//04mP39dH-GKAWCgYIARAAGAQSNwF-L9IrNeusHp85FXCBxgRZnZTCvyzYE9OUEjmQ7CWtWdjJ1X3vB9EwS9n3b4-kJjO9VjkClgs",
});

module.exports = async (email, subject, text) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thinhb1906773@student.ctu.edu.vn",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo" <thinhb1906773@student.ctu.edu.vn>',
      to: email,
      subject: subject, // Subject line
      text: text, // plain text body
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");

    console.log(error);
    return error;
  }
};
