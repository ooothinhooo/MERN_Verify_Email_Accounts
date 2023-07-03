const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();
    let randomInt = getRandomInt(100000, 999999);
    const token = await new Token({
      userId: user._id,
      code: randomInt,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    // await sendEmail(user.email, "Verify Email", url);
    await sendEmail(
      user.email,
      "MÃ XÁC THỰC CỦA BẠN LÀ",
      `Mã Xác Thực của bạn có thời hạn là 60s <> ${randomInt} <>`
    );

    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/verify", async (req, res) => {
  console.log(req.query.id);
  console.log(req.query.token);
  try {
    const user = await User.findOne({ _id: req.query.id });
    console.log(user);

    if (!user) return res.status(400).send({ message: "Invalid link 1" });
    const token = await Token.findOne({
      userId: user._id,
      code: req.query.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid link 2" });
    await User.updateOne({ _id: user._id, verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
