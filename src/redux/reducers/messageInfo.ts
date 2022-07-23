import { ActionWithParameter, MessageInfoEventType } from "../index.d";
import { MessageType } from "../../scripts/index.d";

/**
 * This is the message info reducer, this reducer stores the message information. 
 * This information is normally used to store the message for the message options page.
 * 
 * @param {MessageType | null} action The message information.
 */

const messageInfo = (
  state: MessageType | null = null,
  action: ActionWithParameter<MessageType, MessageInfoEventType>
): typeof state => {
  switch (action.type) {
    case "SET_MESSAGE_INFO":
      return (state = action.payload);

    case "CLEAR_MESSAGE_INFO":
      return (state = null);

    default:
      return state;
  }
};

export default messageInfo;
