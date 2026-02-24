// bot/index.js

const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Prefix command handling
    if (message.content.startsWith('!')) {
        const args = message.content.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'ping') {
            message.channel.send('Pong!');
        } else if (command === 'beep') {
            message.channel.send('Boop!');
        }
    }

    // Slash command handling
    if (message.content.startsWith('/')) {
        const args = message.content.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'ping') {
            message.channel.send('Pong!');
        } else if (command === 'beep') {
            message.channel.send('Boop!');
        }
    }
});

client.login(token);