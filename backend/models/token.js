const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  code: { type: Number, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 360 },
});

module.exports = mongoose.model("token", tokenSchema);
