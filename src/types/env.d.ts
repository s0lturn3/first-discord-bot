declare namespace NodeJS {
    interface ProcessEnv {
        DISCORD_TOKEN: string;
        DISCORD_CLIENTID: string;
        DISCORD_GUILDID: string;
        BOT_STATUS: "online" | "idle" | "dnd" | "invisible";
        ACTIVITY_TYPE: "PLAYING" | "WATCHING" | "LISTENING" | "STREAMING" | "COMPETING";
        ACTIVITY_NAME: string;
    }
}