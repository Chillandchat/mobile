//Login reducer for redux
const loginReducer: any = (loggedInState: boolean = false, action: any) => {
  //Redux actions check
  switch (action.type) {
    case "AUTH_SIGN_IN":
      loggedInState = true;
      break;
    case "AUTH_SIGN_OUT":
      loggedInState = false;
      break;
    default:
      return loggedInState;
  }
};

//Export reducer
export default loginReducer;
