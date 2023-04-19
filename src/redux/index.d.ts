import reducers from "./index";

/**
 * This is the action interface for the redux store without a payload.
 *
 * @param ActionType The type of the type of the action.
 * @param {ActionType} type The type of the action.
 */

export interface ActionNoParameter<ActionType> {
  type: ActionType;
}

/**
 * This is the action interface for the redux store with a payload value.
 *
 * @extends {ActionNoParameter} This interface extends the action no parameter interface.
 *
 * @param PayloadType The type of the payload.
 * @param {PayloadType} payload The payload of the action.
 */

export interface ActionWithParameter<PayloadType, ActionType>
  extends ActionNoParameter<ActionType> {
  payload: PayloadType;
}

// These types validates actions to make sure their names/syntax is correct.
// Redux events types:
export type RoomUserInfoEventType =
  | "SET_ROOM_USER_INFO"
  | "CLEAR_ROOM_USER_INFO";
export type loginStatusEventType = "LOGIN" | "LOGOUT";
export type UserInfoEventType = "SET_USER_INFO" | "DELETE_USER_INFO";
export type MessageInfoEventType = "SET_MESSAGE_INFO" | "CLEAR_MESSAGE_INFO";
export type ProfileInfoEventType = "SET_PROFILE_INFO" | "CLEAR_PROFILE_INFO";
export type ScannerResultEventType =
  | "SET_SCANNER_RESULT"
  | "DELETE_SCANNER_RESULT";
export type ImageBaseEventType = "SET_IMAGE_LINK" | "DELETE_IMAGE_LINK";
export type SessionStatusEventType =
  | "SET_SESSION_STATUS"
  | "DELETE_SESSION_STATUS";

/**
 * This is the root state type of the reducers.
 */

export type RootState = ReturnType<typeof reducers>;

/**
 * This is the Message info type, this type is used in the message info reducer to store a readable message and a actual message data.
 * As the content of the message may be modified.
 *
 * @param {MessageType} message The actual message information.
 * @param {string} readMessage The message content used by the message reader.
 */

export interface MessageInfoType {
  message: MessageType;
  readMessage: string;
}
