module.exports = {
  name: "ping",
  description: "Check the bot latency.",
  async execute(message) {
    const sent = await message.reply("Pinging...");
    const latency = sent.createdTimestamp - message.createdTimestamp;

    sent.edit(`🏓 Pong!\nLatency: ${latency}ms`);
  }
};