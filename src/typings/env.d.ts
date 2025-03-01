import { StringValue } from "ms";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT?: string;

      JWT_SECRET: string;
      JWT_EXPIRES_IN: StringValue;
      JWT_COOKIE_EXPIRES_IN_DAYS: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REDIRECT_URI: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};
