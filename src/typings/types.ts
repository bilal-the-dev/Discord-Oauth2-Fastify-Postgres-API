export interface User {
  userid: string;
  username: string;
  email?: string;
  accesstoken: string;
  refreshtoken: string;
  expiresat: string;
}

export interface discordAuthRequestQuery {
  Querystring: { code?: string };
}
