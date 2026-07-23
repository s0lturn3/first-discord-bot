import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { SlashCommand } from "../../types/types";

const setupCommand: SlashCommand = {
  data: new SlashCommandBuilder()
      .setName('setup')
      .setDescription('Sets up the basic configurations for this instance of the bot.'),
  
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.reply('Initial settings defined successfully!');
    }
    catch (e) {
      console.error(e);
    }
  }
}

export default setupCommand;