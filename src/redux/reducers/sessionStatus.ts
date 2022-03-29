import { RoomType } from "../../scripts";
import { ActionWithParameter, SessionStatusEventType } from "./../index.d";

/**
 * This is the session status reducer.
 *
 * @param {string} action The id of the chat room session.
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
