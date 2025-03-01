import pg from "./pg.js";

// pgsql changes to lower case by default unless you explicitly put in double quotes
(async () => {
  await pg`
      CREATE TABLE IF NOT EXISTS users (
        userId TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT UNIQUE,
        accessToken TEXT UNIQUE NOT NULL,
        refreshToken TEXT UNIQUE NOT NULL,
        expiresAt BIGINT UNIQUE NOT NULL
      );
    `;
})();
