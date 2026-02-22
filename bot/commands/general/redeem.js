const fs = require("fs");
const path = require("path");

module.exports = {
  name: "redeem",
  async execute(message, args) {
    const code = args[0];
    if (!code) return message.reply("Please provide a valid voucher code.");

    const voucherPath = path.join(__dirname, "../../../data/vouchers.json");
    const vouchers = JSON.parse(fs.readFileSync(voucherPath));

    const voucher = vouchers.find(v => v.code === code && !v.redeemed);
    if (!voucher) return message.reply("Invalid or already redeemed voucher.");

    const role = message.guild.roles.cache.get(voucher.roleId);
    if (!role) return message.reply("Role not found.");

    await message.member.roles.add(role);
    voucher.redeemed = true;

    fs.writeFileSync(voucherPath, JSON.stringify(vouchers, null, 2));

    message.reply("Voucher successfully redeemed.");
  }
};