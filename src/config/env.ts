import "dotenv/config";

interface EnvConfig {
  discordToken: string;
}

/**
 * Reads and validates required environment variables once, at startup.
 * Fails fast with a clear error instead of letting `undefined` leak into client.login() and produce a confusing Discord API error later.
*/
function loadEnv(): EnvConfig {
  const discordToken = process.env.DISCORD_TOKEN;

  if (!discordToken) {
    throw new Error('DISCORD_TOKEN is not defined in the environment variables.');
  }

  return { discordToken };
}

export const env = loadEnv();