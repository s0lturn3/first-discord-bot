import {ActivityType, Client, Events, PresenceStatusData, PresenceUpdateStatus} from "discord.js";
import { BotEvent } from "../types/types";
import deployCommands from "../utils/deployCommands";

const clientReadyEvent: BotEvent = {
  name: Events.ClientReady,
  once: true,

  async execute(client: Client<true>) {
    console.log(`\nClient ready! Logged as ${client.user!.tag}!`);

    // Deploy commands
    await deployCommands();
    console.log(`Commands deployed!`);

    const statusType = process.env.BOT_STATUS || 'online';
    const activityType = process.env.ACTIVITY_TYPE || 'PLAYING';
    const activityName = process.env.ACTIVITY_NAME || 'Discord';

    const activityTypeMap = {
      'PLAYING': ActivityType.Playing,
      'WATCHING': ActivityType.Watching,
      'LISTENING': ActivityType.Listening,
      'STREAMING': ActivityType.Streaming,
      'COMPETING': ActivityType.Competing
    };

    const statusMap = {
      'online': PresenceUpdateStatus.Online,
      'idle': PresenceUpdateStatus.Idle,
      'dnd': PresenceUpdateStatus.DoNotDisturb,
      'invisible': PresenceUpdateStatus.Invisible
    };

    client.user!.setPresence({
      status: statusMap[statusType] as PresenceStatusData,
      activities: [{
        name: activityName,
        type: activityTypeMap[activityType]
      }]
    });

    console.log(`Bot status set to '${statusType}'`);
    console.log(`Bot activity set to '${activityType} ${activityName}'`);
  }
}

export default clientReadyEvent;