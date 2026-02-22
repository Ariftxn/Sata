const fs = require("fs");
const path = require("path");
const socket = require("../../server/socket");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);

      const logPath = path.join(__dirname, "../../data/logs.json");
      const logs = fs.existsSync(logPath)
        ? JSON.parse(fs.readFileSync(logPath))
        : [];

      logs.push({
        user: message.author.tag,
        command: commandName,
        time: new Date()
      });

      fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
      socket.emit("commandLog", logs);

    } catch (error) {
      console.error(error);
    }
  }
};