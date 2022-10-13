import { ActionWithParameter, MessageInfoEventType } from "../index.d";
import { MessageInfoType } from "../index.d";

/**
 * This is the message info reducer, this reducer stores the message information.
 * This information is normally used to store the message for the message options page.
 *
 * @param {MessageInfoType | null} action.payload The message information.
 */

const messageInfo = (
  state: MessageInfoType | null = null,
  action: ActionWithParameter<MessageInfoType, MessageInfoEventType>
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
