import { StringValue } from "ms";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT?: string;
      ALLOWED_ORIGINS: string;

      JWT_SECRET: string;
      JWT_EXPIRES_IN: StringValue;
      JWT_COOKIE_EXPIRES_IN_DAYS: string;

      DISCORD_BOT_TOKEN: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      BOT_INVITE_URL: string;
      REDIRECT_URI: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};
