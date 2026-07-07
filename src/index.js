// Load environment variables from the .env file (simplified and direct import and usage)
require('dotenv').config();

// Extract the required classes from the discord.js library
const { Client, GatewayIntentBits } = require('discord.js');

// Initialize the client with specific access permissions (Intents)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Run this event listener once when the bot successfully logs on
client.once('clientReady', () => {
    console.log(`Success! Logged in as ${client.user.tag}`);
});

// Run this event listener every time a message is sent in the server
client.on('messageCreate', async (message) => {
    // Prevent the bot from responding to itself or other bots
    if (message.author.bot) return;

    // Check if the message content matches "ping"
    if (message.content.toLowerCase() === 'ping') {
        await message.reply('Pongão ||e meu pau na sua mão||! <a:peak_dance:1523885137195171920>');
        await message.reply('||Ah e o Lucas é gay!||');
    }
});

// Log the bot into Discord using the hidden token
client.login(process.env.DISCORD_TOKEN);
