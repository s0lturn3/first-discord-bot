import { Command } from "../../types";

const userCommand: Command = {
  name: 'user',
  description: 'Provides information about the user.',

  async execute(interaction) {
		await interaction.reply(`This command was run by ${interaction.author.username}.`);
	}
};

export default userCommand;