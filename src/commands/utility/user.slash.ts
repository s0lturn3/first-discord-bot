import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types/types";

const userCommand: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
		    await interaction.reply(`This command was run by ${interaction.user.username}.`);
        }
        catch (e) {
            console.error(e);
        }
    }
};

export default userCommand;