import { Action, combineReducers, createStore, Store } from "redux";
import loginStatus from "./reducers/loginStatus";
import userInfo from "./reducers/userInfo";

export const reducers: any = combineReducers({
  userInfo: userInfo,
  loginStatus: loginStatus,
});

const store: Store<unknown, Action<any>> = createStore(reducers);

export default store;
