const UserLevel = require("../../server/models/UserLevel");
const GuildConfig = require("../../server/models/GuildConfig");

async function addXP(message) {
  if (message.author.bot) return;

  let user = await UserLevel.findOne({
    userId: message.author.id,
    guildId: message.guild.id
  });

  if (!user) {
    user = await UserLevel.create({
      userId: message.author.id,
      guildId: message.guild.id
    });
  }

  user.xp += 15;

  if (user.xp >= user.level * 100) {
    user.level++;
    user.xp = 0;

    const config = await GuildConfig.findOne({ guildId: message.guild.id });

    const levelRole = config?.levelRoles.find(r => r.level === user.level);
    if (levelRole) {
      const role = message.guild.roles.cache.get(levelRole.roleId);
      if (role) await message.member.roles.add(role);
    }
  }

  await user.save();
}

module.exports = addXP;