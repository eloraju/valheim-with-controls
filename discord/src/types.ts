import {InteractionResponseType, InteractionType} from "discord-interactions";

export type Stage = '$default' | 'demo' | 'stage' | 'prod';
export type InteractionHandler = (interaction: DiscordInteraction) => Promise<DiscordInteractionResponse>;

export enum DiscordCommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3
}

export enum DiscordCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export enum DiscordChannelType {
  GUILD_TEXT = 0, //	a text channel within a server
  DM = 1, //	a direct message between users
  GUILD_VOICE = 2, //	a voice channel within a server
  GROUP_DM = 3, //	a direct message between multiple users
  GUILD_CATEGORY = 4, //	an organizational category that contains up to 50 channels
  GUILD_ANNOUNCEMENT = 5, //	a channel that users can follow and crosspost into their own server (formerly news channels)
  ANNOUNCEMENT_THREAD = 10, //	a temporary sub-channel within a GUILD_ANNOUNCEMENT channel
  PUBLIC_THREAD = 11, //	a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
  PRIVATE_THREAD = 12, //	a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
  GUILD_STAGE_VOICE = 13, //	a voice channel for hosting events with an audience
  GUILD_DIRECTORY = 14, //	the channel in a hub containing the listed servers
  GUILD_FORUM = 15, //	Channel that can only contain threads
}

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
  flags?: number;
  components?: any[];
  attachments?: any[];
}

export interface DiscordCommandOptionChoice {
  // string	1-100 character choice name
  name: string;
  // ?dictionary with keys in available locales	Localization dictionary for the name field. Values follow the same restrictions as name
  //name_localizations?: string;
  // string, integer, or double *	Value for the choice, up to 100 characters if string
  value: string | number;
}

export interface DiscordCommandOption {
  // one of application command option type	Type of option
  type: DiscordCommandOptionType;
  // string	1-32 character name
  name: string;
  // ?dictionary with keys in available locales	Localization dictionary for the name field. Values follow the same restrictions as name
  //name_localizations?: string;
  // string	1-100 character description
  description: string;
  // ?dictionary with keys in available locales	Localization dictionary for the description field. Values follow the same restrictions as description
  //description_localizations?: string;
  // boolean	If the parameter is required or optional--default false
  required?: boolean;
  // array of application command option choice	Choices for STRING, INTEGER, and NUMBER types for the user to pick from, max 25
  choices?: DiscordCommandOptionChoice[];
  // array of application command option	If the option is a subcommand or subcommand group type, these nested options will be the parameters
  options?: DiscordCommandOption;
  // array of channel types	If the option is a channel type, the channels shown will be restricted to these types
  channel_types?: DiscordChannelType[];
  // integer for INTEGER options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the minimum value permitted
  min_value?: number;
  // integer for INTEGER options, double for NUMBER options	If the option is an INTEGER or NUMBER type, the maximum value permitted
  max_value?: number;
  // integer	For option type STRING, the minimum allowed length (minimum of 0, maximum of 6000)
  min_length?: number;
  // integer	For option type STRING, the maximum allowed length (minimum of 1, maximum of 6000)
  max_length?: number;
   // boolean	If autocomplete interactions are enabled for this STRING, INTEGER, or NUMBER type option
  autocomplete?: boolean;
}

export interface DiscordCommand {
  id?: string;
  type?: DiscordCommandType;
  // added at runtime
  application_id?: string;
  // added at runtime
  guild_id?: string;
  name: string;
  //name_localizations?: string;
  description: string;
  //description_localizations?: string;
  options?: DiscordCommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  default_permission?: boolean;
  version?: string;
}

export interface DiscordCommandWithHandler extends DiscordCommand {
  handler: InteractionHandler
}