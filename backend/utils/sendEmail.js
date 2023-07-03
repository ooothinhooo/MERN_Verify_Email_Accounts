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
  refresh_token: process.env.REFRESH_TOKEN,
});

module.exports = async (email, subject, text, code) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    let info = await transporter.sendMail({
      from: '"XÁC THỰC TÀI KHOẢN" <thinhb1906773@student.ctu.edu.vn>',
      to: email,
      subject: subject, // Subject line
      text: text, // plain text body
      html: `
      <main id="content" role="main" class="w-full  max-w-md mx-auto p-6">
    <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">MÃ XÁC THỰC</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Chúng tôi đã nhận được yêu cầu xác thực tài khoản của bạn.
          </p>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Mã xác thực này có thời hạn trong 360s
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">Nhập mã xác thực sau đây:</label>
                <div class="relative">
                  <input value=${code} class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error">
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Nếu bạn không yêu cầu xác thực, hãy cho chúng tôi biết.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  </main>
      `,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");

    console.log(error);
    return error;
  }
};
