import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { REST, Routes } from 'discord.js';

import { getFilesRecursive } from "./utils";

const deployCommands = async () => {
	try {
		const commands = [];

		// searches for the .js and .ts command files
		const commandFiles = (await getFilesRecursive(path.join(__dirname, '..', 'commands'), '.slash.ts'))
			.concat(await getFilesRecursive(path.join(__dirname, '..', 'commands'), '.slash.js'))

		// only iterates through the files that actually exist
		for ( const filePath of commandFiles.filter(e => fs.existsSync(e)) ) {
			const command = require(filePath).default ?? require(filePath);

			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			}
			else {
				console.warn(`WARNING: The command ${filePath} is missing a required 'data' or 'execute' property.`);
			}
		}

		const rest = new REST().setToken(process.env.DISCORD_TOKEN);
		console.log(`Started refreshing ${commands.length} application slash commands globally...`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.DISCORD_CLIENTID),
			{ body: commands }
		);

		console.log('Successfully reloaded all application slash commands.');
	}
	catch (error) {
		console.error(`Error deploying commands: ${error}`);
	}
};

export default deployCommands;