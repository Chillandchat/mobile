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
 * @extends {ActionNoParameter} This interface extends the action no paramater interface.
 * @param PayloadType The type of the payload.
 * @param {PayloadType} payload The payload of the action.
 */

export interface ActionWithParameter<PayloadType, ActionType>
  extends ActionNoParameter<ActionType> {
  payload: PayloadType;
}

// Redux events types:
export type loginStatusEventType = "LOGIN" | "LOGOUT";
export type UserInfoEventType = "SET_USER_INFO" | "DETELE_USER_INFO";
export type SessionStatusEventType =
  | "SET_SESSION_STATUS"
  | "DELETE_SESSION_STATUS";

/**
 * This is the rootstate type
 */

export type RootState = ReturnType<typeof reducers>;
