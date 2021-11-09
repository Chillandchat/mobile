//Importing packages
import { ActionHasParameter, ActionNoParameter } from "./reduxTypes";

//Login action
export const login = (): ActionNoParameter => {
  return {
    type: "AUTH_SIGN_IN",
  };
};

//Logout action
export const logout = (): ActionNoParameter => {
  return {
    type: "AUTH_SIGN_OUT",
  };
};

//Change username action
export const changeUsername = (username: string): ActionHasParameter => {
  return {
    type: "AUTH_SET_USERNAME",
    payload: username,
  };
};

//Clear username action
export const clearUsername = (): ActionNoParameter => {
  return {
    type: "AUTH_LOGOUT_CLEAR_USERNAME",
  };
};
