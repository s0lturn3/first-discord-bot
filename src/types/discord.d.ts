import { Collection } from 'discord.js';

declare module 'discord.js' {
    export interface Command {
        commands: Collection<string, any>;
    }
}