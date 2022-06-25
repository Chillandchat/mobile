import { ActionWithParameter, RoomUserInfoEventType } from "./../index.d";
import { AuthType } from "../../scripts/index.d";

/**
 * This is the room user info reducer, this reducer manages the all the user' information 
 * in the chat room.
 * 
 * @param {Array<AuthType>} action The users' information.
 */

const roomUserInfo = (
  state: Array<AuthType> | {} = {},
  action: ActionWithParameter<Array<AuthType>, RoomUserInfoEventType>
): typeof state => {
  switch (action.type) {
    case "SET_ROOM_USER_INFO":
      return (state = action.payload);

    case "CLEAR_ROOM_USER_INFO":
      return (state = {});

    default:
      return state;
  }
};

export default roomUserInfo;
