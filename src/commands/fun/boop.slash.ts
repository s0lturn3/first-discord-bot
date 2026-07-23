import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types/types";

const boopCommand: SlashCommand = {
  data: new SlashCommandBuilder()
      .setName('boop')
      .setDescription('Boops the specified user, as many times as you want :3')
      .addUserOption(option =>
          option.setName('user')
              .setDescription('User to be booped')
              .setRequired(true)
      ),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      const target = interaction.options.getUser('user');
      const targetMember = await interaction.guild!.members.fetch(target!.id).catch(() => null);

      if (!targetMember) await interaction.reply({ content: 'That user is not in the server.', ephemeral: true });

      try {
        await interaction.reply(`Hey ${target}, you've been booped :p`);
      }
      catch (err) {
        console.error(err);
        await interaction.reply({ content: `There was an error trying to boop this user: ${err}`, ephemeral: true });
      }
    }
    catch (e) {
      console.error(e);
    }
  }
};

export default boopCommand;