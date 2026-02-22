const GuildConfig = require("../../server/models/GuildConfig");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const config = await GuildConfig.findOne({ guildId: member.guild.id });
    if (!config?.welcomeChannel) return;

    const channel = member.guild.channels.cache.get(config.welcomeChannel);
    if (!channel) return;

    channel.send({
      content: config.welcomeMessage
        .replace("{user}", member.user.tag)
        .replace("{count}", member.guild.memberCount)
    });
  }
};