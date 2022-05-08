import { RoomType } from "../../scripts";
import { ActionWithParameter, SessionStatusEventType } from "./../index.d";

/**
 * This is the session status reducer.
 *
 * @param {ActionWithParameter<string>} action The id of the chat room session, @see {index.d.ts} for more information.
 */

const sessionStatus = (
  state: RoomType | {} = {},
  action: ActionWithParameter<RoomType, SessionStatusEventType>
): typeof state => {
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
