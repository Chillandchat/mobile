import { ActionWithParameter, ProfileInfoEventType } from "./../index.d";
import { AuthType } from "./../../scripts/index.d";

/**
 * This is the profile info reducer, this reducer will keep track of the user you are currently viewing in the profile page.
 *
 * @param {AuthType} action.payload The user you are currently viewing.
 */

const profileInfo = (
  state: AuthType | null = null,
  action: ActionWithParameter<AuthType, ProfileInfoEventType>
): typeof state => {
  switch (action.type) {
    case "SET_PROFILE_INFO":
      return (state = action.payload);

    case "CLEAR_PROFILE_INFO":
      return (state = null);

    default:
      return state;
  }
};

export default profileInfo;
