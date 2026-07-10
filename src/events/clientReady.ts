import { Client, Events } from "discord.js";
import { BotEvent } from "../types";

const clientReadyEvent: BotEvent = {
  name: Events.ClientReady,
  once: true,

  execute(client: Client<true>) {
    console.log(`Success! Logged in as ${client.user.tag}`);
  }
}

export default clientReadyEvent;