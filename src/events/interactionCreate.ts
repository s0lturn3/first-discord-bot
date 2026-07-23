import { Events, Interaction } from "discord.js";
import { BotClient, BotEvent } from "../types/types";

const interactionCreate: BotEvent = {
  name: Events.InteractionCreate,

  async execute(interaction: Interaction) {
    console.log('interactionCreate', interaction);
    
    if (!interaction.isChatInputCommand()) return;

    const client = interaction.client as BotClient;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`Command not found: ${interaction.commandName}!`);
      return;
    }

    try {
      await command.execute(interaction);
    }
    catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      }
      else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }
};

export default interactionCreate;