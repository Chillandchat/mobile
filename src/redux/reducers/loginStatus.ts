import { ActionNoParameter, loginStatusEventType } from "../index.d";

/**
 * This is the reducer for the loginStatus object in the redux store.
 *
 * @note This reducer has no arguments
 */

const loginStatus = (
  state: boolean = false,
  action: ActionNoParameter<loginStatusEventType>
): typeof state => {
  switch (action.type) {
    case "LOGIN":
      return (state = true);

    case "LOGOUT":
      return (state = false);

    default:
      return state;
  }
};

export default loginStatus;
