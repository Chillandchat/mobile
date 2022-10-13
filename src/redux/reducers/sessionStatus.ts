import { RoomType } from "../../scripts";
import { ActionWithParameter, SessionStatusEventType } from "./../index.d";

/**
 * This is the session status reducer, this reducer is in charge of keeping track of the room you are in.
 *
 * @param {string} action.payload The data of the chat room session.
 */

const sessionStatus = (
  state: RoomType | {} = {},
  action: ActionWithParameter<RoomType, SessionStatusEventType>
) => {
  switch (action.type) {
    case "SET_SESSION_STATUS":
      return (state = action.payload);

    case "DELETE_SESSION_STATUS":
      return (state = {});

    default:
      return state;
  }
};

export default sessionStatus;
