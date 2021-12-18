//Login reducer for redux
const loginReducer: any = (
  loggedInState: boolean = false,
  action: any
): any => {
  //Redux actions check
  switch (action.type) {
    case "AUTH_SIGN_IN":
      return (loggedInState = true);

    case "AUTH_SIGN_OUT":
      return (loggedInState = false);

    default:
      return loggedInState;
  }
};

//Export reducer
export default loginReducer;
