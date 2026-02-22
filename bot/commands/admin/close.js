module.exports = {
  name: "close",
  async execute(message) {
    if (!message.channel.name.startsWith("ticket-"))
      return message.reply("This is not a ticket channel.");

    await message.channel.delete();
  }
};