declare module "discord-oauth2" {
  export interface PartialGuild {
    isAdmin?: boolean;
    isBotPresent?: boolean;
    members?: number;
    inviteUrl?: string;
  }
}
