import { Events, Interaction } from "discord.js";
import { BotEvent } from "../types";

const interactionCreate: BotEvent = {
  name: Events.InteractionCreate,

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'setup') {
      await interaction.reply('Initial settings defined successfully!');
    }
  }
};

export default interactionCreate;