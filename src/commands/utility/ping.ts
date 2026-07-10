import { Message } from 'discord.js';
import { Command } from "../../types";

const pingCommand: Command = {
  name: 'ping',
  description: 'Replies with Pong!',

  async execute(message: Message) {
    await message.reply('Pong! <a:peak_dance:1523885137195171920>');
  }
}

export default pingCommand;