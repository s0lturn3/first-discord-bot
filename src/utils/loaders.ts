import {ActivityType, Collection, Events, PresenceUpdateStatus, PresenceStatusData, PresenceStatus} from 'discord.js';
import fs from 'fs';
import path from 'path';
import { BotClient, BotEvent, Command, SlashCommand } from '../types/types';
import deployCommands from "./deployCommands";


/**
 * Recursively finds all .ts/.js files under a directory.
 * Lets commands live in subfolders (utility/, moderation/, ...) without any extra wiring.
*/
function getFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) return getFilesRecursively(fullPath);
    if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) return [fullPath];

    return [];
  });
}

export function loadCommands(client: BotClient): void {
  client.commands = new Collection<string, Command>();
  const commandsPath = path.join(__dirname, '..', 'commands')

  if (!fs.existsSync(commandsPath)) return;

  for (const filePath of getFilesRecursively(commandsPath)) {
    const command = require(filePath).default ?? require(filePath);

    if (!command) continue;

    // Slash commands
    if (command!.data && command!.execute) {
      client.commands.set(command.data.name, command);
    }
    // Common commands
    else if (command!.name || command!.execute) {
      client.commands.set(command.name, command);
    }
    else {
      console.warn('Invalid command file:', filePath);
    }

  }

  console.log('Commands loaded:', client.commands.size);
}


export function loadEvents(client: BotClient): void {
  const eventsPath = path.join(__dirname, '..', 'events');

  if (!fs.existsSync(eventsPath)) return;

  let count = 0;

  for (const filePath of getFilesRecursively(eventsPath)) {
    const event: BotEvent = require(filePath).default ?? require(filePath);

    if (!event?.name || !event?.execute) {
      console.warn('Invalid event file:', filePath);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    }
    else {
      client.on(event.name, (...args) => event.execute(...args));
    }

    count++;
  }

  console.log('Events loaded:', count);
}
