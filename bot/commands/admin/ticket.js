module.exports = {
  name: "ticket",
  async execute(message) {
    if (!message.member.permissions.has("Administrator"))
      return message.reply("You do not have permission.");

    const channel = await message.guild.channels.create({
      name: `ticket-${message.author.username}`,
      type: 0,
      permissionOverwrites: [
        {
          id: message.guild.id,
          deny: ["ViewChannel"]
        },
        {
          id: message.author.id,
          allow: ["ViewChannel", "SendMessages"]
        }
      ]
    });

    channel.send("Support ticket created. Please describe your issue.");
  }
};