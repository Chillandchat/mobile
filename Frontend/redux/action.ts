// Importing packages
import { ActionHasParameter, ActionNoParameter, Actions } from "./reduxTypes";

// Login action
export const login = (): ActionNoParameter => {
  return {
    type: "AUTH_SIGN_IN",
  };
};

// Logout action
export const logout = (): ActionNoParameter => {
  return {
    type: "AUTH_SIGN_OUT",
  };
};

// Change username action
export const changeUsername = (username: string): ActionHasParameter => {
  return {
    type: "AUTH_SET_USERNAME",
    payload: username,
  };
};

// Clear username action
export const clearUsername = (): ActionNoParameter => {
  return {
    type: "AUTH_LOGOUT_CLEAR_USERNAME",
  };
};

// Redirect to home action
export const redirectToHome = (): ActionNoParameter => {
  return {
    type: "ROUTER_RETURN_HOME",
  };
};

// Redirect to custom page action
export const redirectToPage = (target: string): ActionHasParameter => {
  return {
    type: "ROUTER_REDIRECT",
    payload: target,
  };
};

// Redirect to error page action
export const redirectToError = (): ActionNoParameter => {
  return {
    type: "ROUTER_HANDLE_ERROR",
  };
};

// Output current route action
export const outputCurrentRoute = (): ActionNoParameter => {
  return {
    type: "ROUTER_DEBUB_OUTPUT_CURRENT_ROUTE",
  };
};

// Manually redirect action
export const manualRedirect = (): ActionNoParameter => {
  return {
    type: "ROUTER_MANUAL_ROUTE_CHANGE",
  };
};

// Actions
const actions: Actions = {
  login: login,
  logout: logout,
  changeUsername: changeUsername,
  manualRedirect: manualRedirect,
  outputCurrentRoute: outputCurrentRoute,
  redirectToPage: redirectToPage,
  redirectToHome: redirectToHome,
  clearUsername: clearUsername,
};

// Export actions
export default actions;
