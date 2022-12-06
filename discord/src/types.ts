import {InteractionResponseType, InteractionType} from "discord-interactions";

export type Stage = '$default' | 'demo' | 'stage' | 'prod';
export type HandlerResult = { err: boolean, result: any };
export type InteractionHandler = (interaction: DiscordInteraction) => DiscordInteractionResponse;

export interface DiscordInteractionData {
  guild_id: string;
  id: string;
  name: string;
  type: number;
}

export interface DiscordMember {
  user?: DiscordUser;
  nick?: string;
  avatar?: string;
  roles: string[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

// Wont go any deeper than this...
export interface DiscrodMessage {
  id: string;
  channel_id: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: DiscordUser[];
  mention_roles: any[];
  mention_channels?: any[];
  attachments: any[];
  embeds: any[];
  reactions?: any[];
  nonce?: number | string;
  pinned: boolean;
  webhook_id?: string;
  type: number;
  activity?: any;
  application?: any;
  application_id?: string;
  message_reference?: string;
  flags?: number;
  referenced_message?: DiscrodMessage;
  interaction?: string;
  thread?: any;
  components?: any[];
  sticker_items?: any[];
  stickers?: any[];
  position?: number;
}

export interface DiscordInteraction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: DiscordInteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: DiscordMember;
  user?: DiscordUser;
  token: string;
  version: number;
  message?: DiscrodMessage;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
}

export interface DiscordInteractionResponse {
  type: InteractionResponseType;
  data?: DiscordInteractionResponseData;
}

export interface DiscordInteractionResponseData {
  tts?: string;
  content: string;
  embeds?: any[];
  allowed_mentions?: any;
  flags?:number;
  components?: any[];
  attachments?: any[];
}