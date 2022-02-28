import { AuthType } from "../scripts/index.d";
import {
  ActionNoParameter,
  loginStatusEventType,
  ActionWithParameter,
  UserInfoEventType,
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
 * This is the set user information action for the user information reducer.
 *
 * @param {AuthType} payload The payload of the action.
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
    type: "DETELE_USER_INFO",
  };
};
