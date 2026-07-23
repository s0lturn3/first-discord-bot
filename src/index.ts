import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { env } from './config/env';
import { BotClient } from './types/types';
import { loadCommands, loadEvents } from './utils/loaders';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
    ]
}) as BotClient;

loadCommands(client);
loadEvents(client);

client.login(env.discordToken);
