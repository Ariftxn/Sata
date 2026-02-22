const { createCanvas, loadImage } = require("canvas");
const UserLevel = require("../../../server/models/UserLevel");

module.exports = {
  name: "rank",
  async execute(message) {
    const user = await UserLevel.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    });

    const canvas = createCanvas(800, 250);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Sans";
    ctx.fillText(`Level: ${user?.level || 1}`, 300, 100);
    ctx.fillText(`XP: ${user?.xp || 0}`, 300, 150);

    const attachment = {
      files: [{
        attachment: canvas.toBuffer(),
        name: "rank.png"
      }]
    };

    message.reply(attachment);
  }
};