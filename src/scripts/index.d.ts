import { AxiosInstance } from "axios";

import { Icon } from './../../../web/components/Icon';

/**
 * This is the ApiEndpoint type, this type makes sure that the all endpoints are valid.
 */

export type ApiEndpoint =
  | "/"
  | "/api/login"
  | "/api/signup"
  | "/api/get-mesages"
  | "/api/get-user-info"
  | "/api/get-users"
  | "/api/report-user"
  | "/api/block-user"
  | "/api/create-room"
  | "/api/join-room"
  | "/api/get-rooms";

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
 * @param {ApiEndpoint}reportUser
 */

export interface ApiEndpoints {
  home: ApiEndpoint;
  login: ApiEndpoint;
  signup: ApiEndpoint;
  getMessages: ApiEndpoint;
  getUserInfo: ApiEndpoint;
  reportUser: ApiEndpoint;
  blockUser: ApiEndpoint;
  getUsers: ApiEndpoint;
  joinRoom: ApiEndpoint;
  getRoom: ApiEndpoint;
  createRoom: ApiEndpoint;
}

/**
 * This is the combined type that is exported from "api.ts".
 *
 * @param {AxiosInstance} instance The Axios instance
 * @param {ApiEndpoints} endpoints All the api endpoints
 * @param {string} apiKey Api key
 */

export interface ApiCombined {
  instance: AxiosInstance;
  endpoints: ApiEndpoints;
  apiKey: string;
}

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {boolean} verified Whether the sender of the message is verified.
 * @param {string} iconColor The icon color.
 */

export interface AuthType {
  id: string;
  username: string;
  password: string;
  verified: boolean;
  bot: boolean;
  blocked: boolean;
  iconColor: string
}
/**
 * This is the room object type.
 *
 * @param {string} id The id of the message room.
 * @param {string} name The name of the message room.
 * @param {string} users The users in the message room.
 * @param {string} iconColor The color of the icon.
 */

export interface RoomType {
  id: string;
  name: string;
  users: Array<string>;
  passcode: string;
  iconColor: string;
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
