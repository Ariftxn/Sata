const socket = require("../../../server/socket");

module.exports = {
  name: "warn",
  async execute(message, args) {
    if (!message.member.permissions.has("KickMembers"))
      return message.reply("You do not have permission.");

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a valid member.");

    socket.emit("modLog", {
      type: "warn",
      user: member.user.tag,
      moderator: message.author.tag,
      time: new Date()
    });

    message.reply("User has been warned.");
  }
};