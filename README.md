# SolBot v1

A personal Discord bot built with TypeScript and discord.js. Currently running in my own server for testing features.

## Tech stack

- [discord.js](https://discord.js.org/) v14
- TypeScript
- [tsx](https://github.com/privatenumber/tsx) for local development (watch mode)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and add your bot token:
   ```
   cp .env.example .env
   ```

3. Run in development (auto-restarts on file changes):
   ```
   npm run dev
   ```

4. Build and run in production:
   ```
   npm run build
   npm start
   ```

## Project structure

```
src/
├── commands/     # One file per text command
├── events/       # One file per discord.js Client event
├── config/       # Env var validation
├── services/     # Business logic decoupled from Discord-specific code
├── utils/        # Command/event loaders
├── types.ts      # Shared types
└── index.ts      # Entry point
```

## Adding a command

Create a file under `src/commands/<category>/<name>.ts` following the `Command` interface in `types.ts`. It's loaded automatically — no manual registration needed.

## Roadmap

- [ ] Migrate from text commands to slash commands
- [ ] Add a moderation command category (kick, ban, mute)
- [ ] Add a simple persistent storage layer (SQLite or JSON) for per-server settings
- [ ] Add basic logging (command usage, errors) to a file or channel
- [ ] Deploy to a small VPS / hosting service for 24/7 uptime
- [ ] Invite to a second server once core features are stable
