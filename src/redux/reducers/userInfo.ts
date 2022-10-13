import { ActionWithParameter, UserInfoEventType } from "../index.d";
import { AuthType } from "./../../scripts/index.d";

/**
 * This is the user info reducer, this reducer keeps track of the user information currently logged in.
 * This reducer keeps tracks of the information so we won't need to keep on fetching from the server when we need it.
 *
 * @param {AuthType} action.payload The user info to be stored in the reducer.
 */

const userInfo = (
  state: AuthType | null = null,
  action: ActionWithParameter<AuthType | null, UserInfoEventType>
): typeof state => {
  switch (action.type) {
    case "SET_USER_INFO":
      return (state = action.payload);

    case "DELETE_USER_INFO":
      return (state = null);

    default:
      return state;
  }
};

export default userInfo;
