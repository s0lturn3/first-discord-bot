import { Client, Collection, Message } from "discord.js";

/**
 * Contract every text command file in src/commands must satisfy.
 * Keep it simple for now (name + execute) — extend with things like `aliases`, `cooldown`, or `permissions` as the bot grows.
*/
export interface Command {
  name: string;
  description: string;
  execute: (message: Message) => Promise<void>;
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
