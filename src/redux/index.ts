import { Action, combineReducers, createStore, Store } from "redux";

import loginStatus from "./reducers/loginStatus";
import messageInfo from "./reducers/messageInfo";
import roomUserInfo from "./reducers/roomUserInfo";
import sessionStatus from "./reducers/sessionStatus";
import userInfo from "./reducers/userInfo";

export const reducers: any = combineReducers({
  userInfo: userInfo,
  loginStatus: loginStatus,
  sessionStatus: sessionStatus,
  roomUserInfo: roomUserInfo,
  messageInfo: messageInfo,
});

const store: Store<unknown, Action<any>> = createStore(reducers);

export default store;
