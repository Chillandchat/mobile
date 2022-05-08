import { RoomUserInfoEventType } from "../index.d";
import { ActionWithParameter } from "../index.d";
import { AuthType } from "../../scripts/index.d";

/**
 *
 * @param {ActionWithParameter<Array<AuthType>>} state The state of the room user info, @see {index.d.ts} for more information.
 */

const roomUserInfo = (
  state: Array<AuthType> = [],
  action: ActionWithParameter<Array<AuthType>, RoomUserInfoEventType>
): typeof state => {
  switch (action.type) {
    case "SET_ROOM_USER_INFO":
      return (state = action.payload);
    case "DELETE_ROOM_USER_INFO":
      return (state = []);
    default:
      return state;
  }
};

export default roomUserInfo;
