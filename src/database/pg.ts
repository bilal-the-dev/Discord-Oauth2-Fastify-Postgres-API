import postgres from "postgres";

const pg = postgres({
  /* options */
}); // will use psql environment variables

export default pg;
