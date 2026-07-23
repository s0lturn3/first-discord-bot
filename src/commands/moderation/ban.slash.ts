import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { SlashCommand } from "../../types/types";

const banCommand: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a specified user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User ID')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for baning')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            const target = interaction.options.getUser('user'); // returns a User (global); fetch GuildMember before guild-scoped operations
            const reason = interaction.options.getString('reason') || 'No reason provided';

            const targetMember = await interaction.guild!.members.fetch(target!.id).catch(() => null); // fetch GuildMember: necessary to check roles, permissions and .bannable property

            if (!targetMember) await interaction.reply({ content: 'That user is not in the server.', ephemeral: true }); // abort if the user isn't a member of this guild
            else if (!targetMember.bannable) await interaction.reply({ content: 'I cannot ban this user. They may have higher permissions than me.', ephemeral: true }); // .bannable reflects whether the bot can ban considering role hierarchy and permissions

            try {
                await targetMember!.ban({ reason }); // perform the guild ban; will throw if missing permissions or blocked by role hierarchy
                await interaction.reply(`Successfully baned **${target!.tag}** from the server. \nReason: ${reason}`);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: `There was an error trying to ban this user: ${error}`, ephemeral: true });
            }
        }
        catch (err) {
            console.error(err);
        }
    }
};

export default banCommand;