module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);

    if (!role) return;

    await interaction.member.roles.add(role);
    await interaction.reply({
      content: "Role successfully assigned.",
      ephemeral: true
    });
  }
};