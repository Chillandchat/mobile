// Login reducer for redux
const loginReducer = (
  loggedInState: boolean = false,
  action: any
): boolean => {
  // Redux actions check
  switch (action.type) {
    case "AUTH_SIGN_IN":
      return (loggedInState = true);

    case "AUTH_SIGN_OUT":
      return (loggedInState = false);

    default:
      return loggedInState;
  }
};

// Export reducer
export default loginReducer;
