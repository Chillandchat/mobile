// ROUTES:
// / - Home
// /chat - Chat room
// /error - Error page
// /signup - Sign up page

// Importing packages
import * as reactNative from "react-native";

// Router reducer for redux
const routerReducer = (routerState: string = "/", action: any): string => {
  // Redux action check
  switch (action.type) {
    case "ROUTER_REDIRECT":
      return (routerState = action.payload);

    case "ROUTER_HANDLE_ERROR":
      return (routerState = "/error");

    case "ROUTER_RETURN_HOME":
      return (routerState = "/");

    case "ROUTER_DEBUB_OUTPUT_CURRENT_ROUTE":
      reactNative.Alert.alert(
        "ROUTER DEBUG MESSAGE",
        `Current route: ${routerState}`
      );
      console.log(`ROUTER DEBUG MESSAGE: Current route: ${routerState}`);
      break;

    case "ROUTER_DEBUG_MANUAL_ROUTE_CHANGE":
      let enteredRoute: string;
      reactNative.Alert.prompt(
        "ROUTER DEBUG PROMPT",
        "Please enter a route to change to.",
        (text: string): string => (enteredRoute = text)
      );
      return (routerState = enteredRoute);

    default:
      return routerState;
  }
};

// Export reducer
export default routerReducer;
