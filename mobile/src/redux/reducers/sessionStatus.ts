import {
  ActionWithParameter,
  SessionStatus,
  SessionStatusEventType,
} from "./../index.d";

/**
 * This is the session status reducer.
 * 
 * @param {string} action The id of the chat room session.
 */

const sessionStatus = (
  state: SessionStatus = { chatSessionId: "" },
  action: ActionWithParameter<string, SessionStatusEventType>
) => {
  switch (action.type) {
    case "SET_SESSION_STATUS":
      return {
        chatSessionId: action.payload,
      };
    case "DELETE_SESSION_STATUS":
      return {
        chatSessionId: "",
      };
    default:
      return state;
  }
};

export default sessionStatus;
