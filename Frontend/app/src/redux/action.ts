//Login action
export const login: any = () => {
  return {
    type: "AUTH_SIGN_IN",
  };
};

//Logout action
export const logout: any = () => {
  return {
    type: "AUTH_SIGN_OUT",
  };
};

//Change username action
export const changeUsername: any = (username: string) => {
  return {
    type: "AUTH_SET_USERNAME",
    payload: username,
  };
};

//Clear username action
export const clearUsername: any = () => {
  return {
    type: "AUTH_LOGOUT_CLEAR_USERNAME",
  };
};

//Combine actions
const actions = {
  userLogin: login(),
  userLogout: logout(),
  userChangeUsername: changeUsername(),
  userClearUsername: clearUsername(),
};

//Export actions
export default actions;
