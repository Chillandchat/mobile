import { Action, combineReducers, createStore, Store } from "redux";

import imageBase from "./reducers/imageBase";
import loginStatus from "./reducers/loginStatus";
import messageInfo from "./reducers/messageInfo";
import profileInfo from "./reducers/profileInfo";
import roomUserInfo from "./reducers/roomUserInfo";
import sessionStatus from "./reducers/sessionStatus";
import userInfo from "./reducers/userInfo";
import scannerResult from "./reducers/scannerResult";

export const reducers: any = combineReducers({
  userInfo,
  loginStatus,
  sessionStatus,
  roomUserInfo,
  messageInfo,
  profileInfo,
  imageBase,
  scannerResult,
});

const store: Store<unknown, Action<any>> = createStore(reducers);

export default store;
