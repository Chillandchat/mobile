import { RoomType } from "./../scripts/index.d";
import { AuthType } from "../scripts/index.d";
import {
  ActionNoParameter,
  loginStatusEventType,
  ActionWithParameter,
  UserInfoEventType,
  SessionStatusEventType,
  RoomUserInfoEventType,
} from "./index.d";

/**
 *  This is the login action for the login reducer.
 */

export const login = (): ActionNoParameter<loginStatusEventType> => {
  return {
    type: "LOGIN",
  };
};

/**
 *  This is the logout action for the login reducer.
 */

export const logout = (): ActionNoParameter<loginStatusEventType> => {
  return {
    type: "LOGOUT",
  };
};

/**
 * This is the set session info action for the session status reducer.
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
 * This is the clear session data action, this will clear the session data.
 */

export const clearSessionData =
  (): ActionNoParameter<SessionStatusEventType> => {
    return {
      type: "DELETE_SESSION_STATUS",
    };
  };

/**
 * This is the set user information action for the user information reducer.
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
 */

export const deleteUserInfo = (): ActionNoParameter<UserInfoEventType> => {
  return {
    type: "DELETE_USER_INFO",
  };
};

/**
 * This is the clear room user info action, this action is used for clearing the room user info reducer.
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
