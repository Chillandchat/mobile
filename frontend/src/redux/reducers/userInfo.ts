import { ActionWithParameter, UserInfoEventType } from "../index.d";
import { AuthType } from "./../../scripts/index.d";

/**
 * This is the reducer for the userInfo object in the redux store.
 *
 * @param {ActionWithParameter<AuthType>} action  The action object has one payload, @see {index.d.ts} for more information.
 */

const userInfo = (
  state: AuthType | {} = {},
  action: ActionWithParameter<AuthType, UserInfoEventType>
): typeof state => {
  switch (action.type) {
    case "SET_USER_INFO":
      return (state = action.payload);

    case "DETELE_USER_INFO":
      return (state = {});

    default:
      return state;
  }
};

export default userInfo;
