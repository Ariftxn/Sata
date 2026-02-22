const mongoose = require("mongoose");

const GuildConfig = new mongoose.Schema({
  guildId: String,
  prefix: { type: String, default: "." },
  welcomeChannel: String,
  welcomeMessage: String,
  welcomeImage: String,
  goodbyeChannel: String,
  goodbyeMessage: String,
  muteRole: String,
  levelRoles: [
    {
      level: Number,
      roleId: String
    }
  ]
});

module.exports = mongoose.model("GuildConfig", GuildConfig);