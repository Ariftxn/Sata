require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const socket = require("../server/socket");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
client.prefix = ".";

// Load prefix dynamically
const configPath = path.join(__dirname, "../data/config.json");
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath));
  client.prefix = config.prefix || ".";
}

// Load Commands
const commandFolders = fs.readdirSync("./bot/commands");

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./bot/commands/${folder}`);
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

// Events
const eventFiles = fs.readdirSync("./bot/events");
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

mongoose.connect(process.env.MONGO_URI);
client.login(process.env.BOT_TOKEN);

module.exports = client;