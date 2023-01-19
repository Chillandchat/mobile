import { AxiosInstance } from "axios";

/**
 * This is the ApiEndpoint type, this type makes sure that the all endpoints are valid.
 */

export type ApiEndpoint =
  | "/"
  | "/api/login"
  | "/api/signup"
  | "/api/get-messages"
  | "/api/get-user-info"
  | "/api/get-users"
  | "/api/report-room"
  | "/api/block-user"
  | "/api/create-room"
  | "/api/join-room"
  | "/api/get-rooms"
  | "/api/remove-room"
  | "/api/update-description"
  | "/api/unfollow-user"
  | "/api/follow-user"
  | "/api/update-icon-color"
  | "/api/get-public-rooms"
  | "/api/get-gif"
  | "/api/upload-content";

/**
 * This is the ApiEndpoints type, This type works with the "ApiEndpoint"
 * type to validate the endpoints in the code.
 *
 * Endpoints:
 * @param {ApiEndpoint} home
 * @param {ApiEndpoint} login
 * @param {ApiEndpoint} signup
 * @param {ApiEndpoint} getMessages
 * @param {ApiEndpoint} getUsers
 * @param {ApiEndpoint} getUserInfo
 * @param {ApiEndpoint} blockUser
 * @param {ApiEndpoint} reportUser
 * @param {ApiEndpoint} reportRoom
 * @param {ApiEndpoint} unfollowUser
 * @param {ApiEndpoint} followUser
 * @param {ApiEndpoint} updateDescription
 * @param {ApiEndpoint} updateIconColor
 * @param {ApiEndpoint} getPublicRooms
 * @param {ApiEndpoint} uploadContent
 * @param {ApiEndpoint} getGif
 */

export interface ApiEndpoints {
  home: ApiEndpoint;
  login: ApiEndpoint;
  signup: ApiEndpoint;
  getMessages: ApiEndpoint;
  getUserInfo: ApiEndpoint;
  reportRoom: ApiEndpoint;
  blockUser: ApiEndpoint;
  getUsers: ApiEndpoint;
  getGif: ApiEndpoint;
  joinRoom: ApiEndpoint;
  getRoom: ApiEndpoint;
  createRoom: ApiEndpoint;
  removeRoom: ApiEndpoint;
  followUser: ApiEndpoint;
  unfollowUser: ApiEndpoint;
  updateDescription: ApiEndpoint;
  updateIconColor: ApiEndpoint;
  getPublicRooms: ApiEndpoint;
  uploadContent: ApiEndpoint;
}

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the user.
 * @param {string} iconColor The icon color.
 * @param {string} description The description of the user profile.
 * @param {number} followers The number of followers of the user.
 * @param {Array<string>} following The array of following users of the user.
 * @param {string} username The username of the user.
 * @param {boolean} verified Whether the user is verified.
 * @param {string} password The password of the user.
 * @param {boolean} bot Whether the user is a bot.
 * @param {boolean} blocked Wether the user is blocked.
 */

export interface AuthType {
  id: string;
  username: string;
  password: string;
  verified: boolean;
  bot: boolean;
  blocked: boolean;
  iconColor: string;
  description: string;
  followers: number;
  following: Array<string>;
}

/**
 * This is the room object type.
 *
 * @param {string} id The id of the message room.
 * @param {string} name The name of the message room.
 * @param {string} users The users in the message room.
 * @param {string | null} passcode The passcode of the room.
 * @param {string} iconColor The color of the icon.
 * @param {boolean} public Weather the room is public or not.
 */

export interface RoomType {
  id: string;
  name: string;
  users: Array<string>;
  passcode: string | null;
  iconColor: string;
  public: boolean;
}

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {string} room The room that the message belongs to.
 */

export interface MessageType {
  id: string;
  user: string;
  content: string;
  room: string;
}

/**
 * This is the keyboard mode type, this is used to validate the keyboard mode.
 *
 * @option 'start' The start mode.
 * @option 'stop' The stop mode.
 */

export type KeyboardMode = "start" | "stop";

/**
 * This is the content type for the upload content endpoint.
 *
 * @option 'CHILL&CHAT_IMG' Type for images.
 * @option 'CHILL&CHAT_GIF' Type for GIFs.
 */

export type ContentType = "CHILL&CHAT_IMG" | "CHILL&CHAT_GIF";
