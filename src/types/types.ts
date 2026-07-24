import { ChatInputCommandInteraction, Client, Collection, Message, SlashCommandBuilder} from "discord.js";

/**
 * Contract every text command file in src/commands must satisfy.
 * Keep it simple for now (name + execute) — extend with things like `aliases`, `cooldown`, or `permissions` as the bot grows.
*/
export interface Command {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

/**
 * Contract every text command file in src/commands must satisfy.
 * Keep it simple for now (name + execute) — extend with things like `aliases`, `cooldown`, or `permissions` as the bot grows.
 */
export interface MessageCommand {
  name: string;
  description: string;
  execute: (message: Message) => Promise<void>;
}

/**
 * Contract every slash command file in src/commands must satisfy.
 * Keep it simple for now (name + execute) — extend with things like `aliases`, `cooldown`, or `permissions` as the bot grows.
 */
export interface SlashCommand {
  data: SlashCommandBuilder | any,
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
}

/**
 * Contract every event file in src/events must satisfy.
 * `name` must match a valid discord.js Client event name.
*/
export interface BotEvent {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void> | void;
}

/** Augments the discord.js Client so `client.commands` is known to TypeScript everywhere in the project, instead of using `any`. */
export interface BotClient extends Client {
  commands: Collection<string, Command>;
}
