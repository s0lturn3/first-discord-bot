import { Events, Message } from "discord.js";
import { BotClient, BotEvent } from "../types";

const messageCreateEvent: BotEvent = {
  name: Events.MessageCreate,

  async execute(message: Message) {
    // Prevent the bot to responding to itself or other bots
    if (message.author.bot) return;

    const client = message.client as BotClient;
    const command = client.commands.get(message.content.toLowerCase());

    if (!command) return;

    try {
      await command.execute(message);
    }
    catch (err) {
      console.error(`Error executing command "${command.name}":`, err);
      await message.reply('Something went wrong running that command.')
    }
  }
};

export default messageCreateEvent;