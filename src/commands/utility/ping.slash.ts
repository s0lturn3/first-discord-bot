import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import { SlashCommand} from "../../types/types";

const pingCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong and latency information!'),

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true }); // fetchReply:true returns the sent Message so timestamps can be used to compute latency
      const pingTime = (sent as any).createdTimestamp - interaction.createdTimestamp; // bot response latency: difference between reply creation and interaction creation timestamps

      await interaction.editReply(`Pong <a:peak_dance:1523885137195171920> \nBot latency: ${pingTime}ms \nAPI latency: ${Math.round(interaction.client.ws.ping)}ms`);
      // interaction.client.ws.ping is discord.js's rolling WebSocket ping value (represents API latency)
    }
    catch (e) {
      console.error(e);
    }
  }
}

export default pingCommand;