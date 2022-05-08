import reducers from "./index";

/**
 * This is the action interface for the redux store.(Without the payload)
 *
 * @param ActionType The type of the type of the action.
 * @param {ActionType} type The type of the action.
 */

export interface ActionNoParameter<ActionType> {
  type: ActionType;
}

/**
 * This is the action interface for the redux store.(With the payload)
 *
 * @extends {ActionNoParameter} This interface extends the action no parameter interface.
 * @param PayloadType The type of the payload.
 * @param {PayloadType} payload The payload of the action.
 */

export interface ActionWithParameter<PayloadType, ActionType>
  extends ActionNoParameter<ActionType> {
  payload: PayloadType;
}

// Redux events types:
export type LoginStatusEventType = "LOGIN" | "LOGOUT";
export type RoomUserInfoEventType = "SET_ROOM_USER_INFO" |"DELETE_ROOM_USER_INFO";
export type UserInfoEventType = "SET_USER_INFO" | "DELETE_USER_INFO";
export type SessionStatusEventType =
  | "SET_SESSION_STATUS"
  | "DELETE_SESSION_STATUS";

/**
 * This is the rootstate type
 */

export type RootState = ReturnType<typeof reducers>;
