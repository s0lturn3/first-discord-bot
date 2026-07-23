import {ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { SlashCommand } from "../../types/types";

const kickCommand: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a specified user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        try {
            const target = interaction.options.getUser('user'); // returns a User (global); must fetch the GuildMember for guild-scoped actions
            const reason = interaction.options.getString('reason') || 'No reason provided';

            const targetMember = await interaction.guild!.members.fetch(target!.id).catch(() => null); // fetch GuildMember: required to access roles, permissions and convenience properties like .kickable

            if (!targetMember) await interaction.reply({ content: 'That user is not in the server.', ephemeral: true }); // abort if user is not present in the guild cache or server
            else if (!targetMember.kickable) await interaction.reply({ content: 'I cannot kick this user. They may have higher permissions than me.', ephemeral: true }); // .kickable reflects role hierarchy and bot permissions

            try {
                await targetMember!.kick(reason); // perform the guild kick; will throw if lacking permissions or blocked by role hierarchy
                await interaction.reply(`Successfully kicked **${target!.tag}** from the server. \nReason: ${reason}`);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: `There was an error trying to kick this user: ${error}`, ephemeral: true });
            }
        }
        catch (e) {
            console.error(e);
        }
    }
};

export default kickCommand;