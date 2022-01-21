// Username reducer for redux
const usernameReducer = (usernameState: string = "", action: any): string => {
  // Redux action check
  switch (action.type) {
    case "AUTH_SET_USERNAME":
      return (usernameState = action.payload);

    case "AUTH_LOGOUT_CLEAR_USERNAME":
      return (usernameState = "");

    default:
      return usernameState;
  }
};

// Export reducer
export default usernameReducer;
