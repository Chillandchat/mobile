import { RoomType } from "./../scripts/index.d";
import { AuthType } from "../scripts/index.d";
import {
  ActionNoParameter,
  loginStatusEventType,
  ActionWithParameter,
  UserInfoEventType,
  SessionStatusEventType,
  RoomUserInfoEventType,
  MessageInfoEventType,
  ProfileInfoEventType,
  ImageBaseEventType,
  MessageInfoType,
} from "./index.d";

/**
 * This is the login action for the login status reducer.
 * As the name suggests this action will just set the logged in flag to true.
 *
 * @note This action does not take any arguments.
 */

export const login = (): ActionNoParameter<loginStatusEventType> => {
  return {
    type: "LOGIN",
  };
};

/**
 * This is the logout action for the login reducer.
 * As the name suggests this action will just log the user out and set the logged in flag to false.
 *
 * @note This action does not take any arguments.
 */

export const logout = (): ActionNoParameter<loginStatusEventType> => {
  return {
    type: "LOGOUT",
  };
};

/**
 * This is the set session info action for the session status reducer.
 * This action will set the session data reducer to the data argument.
 *
 * @param {string} data The id of the chat room session.
 */

export const setSessionData = (
  data: RoomType
): ActionWithParameter<RoomType, SessionStatusEventType> => {
  return {
    type: "SET_SESSION_STATUS",
    payload: data,
  };
};

/**
 * This is the clear session data action, this action will just clear the session data.
 *
 * @note The action does not take any arguments.
 */

export const clearSessionData =
  (): ActionNoParameter<SessionStatusEventType> => {
    return {
      type: "DELETE_SESSION_STATUS",
    };
  };

/**
 * This is the set user information action for the user information reducer.
 * As the name suggests, this action will set the user info to the reducer.
 *
 * @param {AuthType} userInfo The payload of the action.
 */

export const setUserInfo = (
  userInfo: AuthType
): ActionWithParameter<AuthType, UserInfoEventType> => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo,
  };
};

/**
 * This is the delete user information action for the user information reducer.
 *
 * @note This action does not take any arguments.
 */

export const deleteUserInfo = (): ActionNoParameter<UserInfoEventType> => {
  return {
    type: "DELETE_USER_INFO",
  };
};

/**
 * This is the clear room user info action, this action is used for clearing the room user info reducer.
 *
 * @note This action does not take any arguments.
 */

export const clearRoomUserInfo =
  (): ActionNoParameter<RoomUserInfoEventType> => {
    return {
      type: "CLEAR_ROOM_USER_INFO",
    };
  };

/**
 * This action is used for storing the users' info into the room user info reducer.
 *
 * @param {Array<AuthType>} payload The users' info.
 */

export const setRoomUserInfo = (
  payload: Array<AuthType>
): ActionWithParameter<Array<AuthType>, RoomUserInfoEventType> => {
  return {
    type: "SET_ROOM_USER_INFO",
    payload: payload,
  };
};

/**
 * This is the set message info action for the message information reducer.
 * This action will set the message information from the payload in the action.
 *
 * @param {MessageInfoType} payload The message information.
 */

export const setMessageInfo = (
  payload: MessageInfoType
): ActionWithParameter<MessageInfoType, MessageInfoEventType> => {
  return {
    type: "SET_MESSAGE_INFO",
    payload: payload,
  };
};

/**
 * This is the clear message information action for the message information reducer.
 * This action will clear the message information data reducer.
 *
 * @note This action does not take any arguments.
 */

export const clearMessageInfo = (): ActionNoParameter<MessageInfoEventType> => {
  return { type: "CLEAR_MESSAGE_INFO" };
};

/**
 * This is the set profile info action, this action will change the profile information.
 * In the profile info reducer.
 *
 * @param {AuthType} payload
 */

export const setProfileInfo = (
  payload: AuthType
): ActionWithParameter<AuthType, ProfileInfoEventType> => {
  return { type: "SET_PROFILE_INFO", payload: payload };
};

/**
 * This is the clear profile info action, this action will clear the profile information.
 *
 * @note This action does not take any arguments.
 */

export const clearProfileInfo = (): ActionNoParameter<ProfileInfoEventType> => {
  return { type: "CLEAR_PROFILE_INFO" };
};

/**
 * This is the set image base action, this action will set the parameter into the reducer.
 *
 * @param {string} payload The link of the image's link.
 */

export const setImageBase = (
  payload: string
): ActionWithParameter<string, ImageBaseEventType> => {
  return { type: "SET_IMAGE_LINK", payload: payload };
};

/**
 * This is the clear image base action, this action will as the name suggests will clear the image base reducer.
 *
 * @note This action does not take any arguments.
 */

export const clearImageBase = (): ActionNoParameter<ImageBaseEventType> => {
  return { type: "DELETE_IMAGE_LINK" };
};
