require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

const noodlebot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ],
});

const discordToken = process.env.DISCORD_TOKEN;

noodlebot.on("ready", (client) => {
    console.log(`Status: ✅ | ${client.user.tag} is online.`);
});

noodlebot.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'test') {
        interaction.reply('Hello!');
    }
});

noodlebot.login(discordToken);