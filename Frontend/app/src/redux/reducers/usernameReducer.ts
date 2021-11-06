//Username reducer for redux
const usernameReducer: any = (usernameState: string = "", action: any) => {
  //Redux action check
  switch (action.type) {
    case "AUTH_SET_USERNAME":
      usernameState = action.payload;
      break;
    case "AUTH_LOGOUT_CLEAR_USERNAME":
      usernameState = "";
      break;
    default:
      return usernameState;
  }
};

//Export reducer
export default usernameReducer;
