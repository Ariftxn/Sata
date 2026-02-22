const mongoose = require("mongoose");

const Voucher = new mongoose.Schema({
  code: String,
  roleId: String,
  guildId: String,
  redeemed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Voucher", Voucher);