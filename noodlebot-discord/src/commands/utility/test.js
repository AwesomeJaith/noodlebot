const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription('Replies with "Hello!"'),
  async execute(interaction) {
    await interaction.reply("Hello!");
  },
};
