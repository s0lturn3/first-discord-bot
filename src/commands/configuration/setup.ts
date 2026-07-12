import { Message } from "discord.js";
import { Command } from "../../types";

const setupCommand: Command = {
  name: 'setup',
  description: 'Sets up the basic configurations for this instance of the bot.',
  
  async execute(message: Message) {
    await message.reply('Initial settings defined successfully!');
  }
}

export default setupCommand;