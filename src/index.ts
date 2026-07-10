import { Client, GatewayIntentBits } from 'discord.js';
import { env } from './config/env';
import { BotClient } from './types';
import { loadCommands, loadEvents } from './utils/loaders';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}) as BotClient;

loadCommands(client);
loadEvents(client);

client.login(env.discordToken);
